import { Router } from 'express'
import passport from 'passport'
import { validationFieldsDates } from '../middleware/validationFieldsDates.js'
export const routerSessions = Router()
 

routerSessions.post('/register',  passport.authenticate(`register`, { failureRedirect: '/errorRegister', successRedirect: '/home' }))
routerSessions.post('/login', passport.authenticate(`login`, { failureRedirect: '/errorLogin',successRedirect: '/home' })) 
routerSessions.get('/loginGithub', passport.authenticate(`github`, {scope: ['user:email']})) 

