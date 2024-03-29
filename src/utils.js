import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from './config/config.js';


/*
 * hashSync : toma el password y salt para "hashear"
 * genSaltSync : General un salt (string aleatorio)
 * El password no se puede volver a obtener por ningun metodo. Irreversible
*/

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

/*
Generamos token
*/
export const generateToken = (user) => {
    const token = jwt.sign({ user }, config.PRIVATE_KEY, { expiresIn: '24h' });
    return token;
}

/*
Autenticamos token
*/
export const authToken = (req, res, next) => {
    const authToken = req.cookies.codercookie;
    if (!authToken) {
        return res.status(401).send({ 
            error: "Not auth" 
        })
    }
    const token = authToken.split(' ')[1];
    jwt.verify(token, config.PRIVATE_KEY, (error, credentials) => {
        if (error) {
            return res.status(403).send({ error: "Not authorized" });
        }
        req.user = credentials.user;
        next();
    })
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({
                    error: info.messages ? info.messages : info.toString()
                })
            }
            req.user = user;
            next();
        })(req, res, next)
    }
}

export const authorizationCheck = (rol) => {
    return async(req, res, next) => {
        if (!req.user) {
            return res.status(401).send({error: 'Unauthorizated'})
        }
        if (req.user.user.rol != rol) {
            return res.status(403).send({error: 'Not enough privileges'})
        }
        next();
    }
}

export const handlePolicies = (policies) => (req, res, next) => {
    if (policies.includes("PUBLIC")) return next();
    if (policies.includes("USER") || policies.includes("ADMIN")) {
        const user = req.session.user;
        if (!user) return res.send("No autenticado");
        if (policies.includes("ADMIN")) {
            if (user.role.toUpperCase() !== "ADMIN") return res.send("No autorizado");
        }
        req.user = user;
        return next();
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;