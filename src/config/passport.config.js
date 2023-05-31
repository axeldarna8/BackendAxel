import passport from "passport";
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import jwt from 'passport-jwt';
import { userModel } from "../Dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['codercookie']
    }
    return token;
}

const initializePassport = () => {

    passport.use('github', new GitHubStrategy(
        {
            clientID: "Iv1.7434a21d7aa5f1aa",
            clientSecret: "71c99339afe110338270b4229c58860a6b9e8455",
            callbackURL: "http://localhost:8080/api/sessions/githubcallback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({ email: profile._json.email });
                if (user) {
                    return done(null, user)
                } else {
                    const newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        email: profile._json.email,
                        age: "",
                        password: ""
                    }
                    const result = await userModel.create(newUser);
                    return done(null, result);
                }
            } catch (error) {
                return done('Error to login with github' + error)
            }
        }
    ))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'MaincrasapEEE', //PRIVATE_KEY de utils.js
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }
    ))

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                let user = await userModel.findOne({ email: username });
                if (user) {
                    console.log("User already exists");
                    return done(null, false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    role: 'user',
                    password: createHash(password)
                }
                let result = await userModel.create(newUser);
                return done(null, result);
            } catch (error) {
                return done("Error al obtener el usuario: " + error);
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                user.last_connection = new Date();
                await user.save();
                if (!user) {
                    console.log('User does not exist');
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) return done(null, false);
                return done(null, user);
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user)
    })
}

export default initializePassport;