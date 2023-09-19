import {Router} from 'express'
import { controllerViews } from '../controllers/controllerViews.js'
import { authPassport2, authPassport } from '../middleware/authPasport.js'
import passport from 'passport'

export const routerViews = Router()

routerViews.get('/', controllerViews.controllerIndex) 
routerViews.get('/users/profile-github', passport.authenticate(`github`, { scope: ['user:email'], failureRedirect: '/errorLogin',successRedirect: '/home' }))

routerViews.get('/home', authPassport, controllerViews.controllerHome) 
routerViews.get('/current', authPassport, controllerViews.controllerProfile) 
routerViews.get('/realtimeproducts', authPassport, controllerViews.controllerRealtimeproducts) 
routerViews.get('/products',authPassport, controllerViews.controllerProductsInTarget) 
routerViews.get('/carts/:cid', authPassport, controllerViews.controllerViewCart) 

routerViews.get('/errorRegister', authPassport2, controllerViews.controllerViewsErrorRegister) 
routerViews.get('/errorLogin', authPassport2, controllerViews.controllerViewsErrorLogin) 
routerViews.get('/logout', controllerViews.controllerLogout) 
routerViews.get('/register', authPassport2, controllerViews.controllerViewsRegister)
routerViews.get('/login', authPassport2, controllerViews.controllerViewsLogin) 
