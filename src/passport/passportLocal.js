import passport from "passport";
import { Strategy as StrategyLocal } from "passport-local";
import { isValidPass, serviceUsers } from "../services/serviceUsers.js";
import { repository } from "../repository/repository.js";

const strategyOptions = {
    usernameField: 'email',
    passReqToCallback: true
}
async function login(req, email, password, done) {
    try {
        const user = await serviceUsers.serviceGetByEmail(email)
        if (!user) {
            return done(null, false)
        }  
        if (!isValidPass(password, user.password)) {
            return done(null, false)
        }
        return done(null,user)    
    } catch (error) {
        return done(error, true)    
    }
}
async function register(req, email, password, done) {
    try {
        const user = await serviceUsers.serviceGetByEmail(email)
        if (user) {
            return done(null, false)
        }
        const newUser = await serviceUsers.serviceAddUser(req.body)
        return done(null, newUser)    
    } catch (error) {
        return done(error, true)    
    }
}

passport.use('login', new StrategyLocal(strategyOptions, login))
passport.use('register', new StrategyLocal(strategyOptions, register))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await repository.repositoryGetUsersById(id);
        return done(null, user);        
    } catch (error) {
        throw error
    }
});