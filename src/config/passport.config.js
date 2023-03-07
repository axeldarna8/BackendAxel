import passport from "passport";
import local from 'passport-local';
import { userModel } from "../Dao/models/user.model";
import { createHash , isValidPassword } from "../utils";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register' , new LocalStrategy({
        
    }))
}