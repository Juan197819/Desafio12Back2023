import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { errorHandler } from './src/middleware/errorHandler.js';
import passport from 'passport';
import './src/passport/passportGithub.js'
import './src/passport/passportLocal.js'
import router from './src/routes/index.js'
import { configSession } from './src/config/session.js';
import logger from './src/config/configWinston.js';
const app = express()
logger.log('info', 'mMENSAJE INFO')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname +'/src/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname +'/src/views')
app.set('view engine', 'handlebars')
app.use(configSession)
app.use(passport.initialize())
app.use(passport.session())
app.use('/',router)
app.all('*', (req, res, next)=>res.status(404).json('Invalid path'))
app.use(errorHandler)

const PORT  = 8080
const server = app.listen(PORT,()=>{
    ('Escuchando en puerto ' + server.address().port)
}).on('error',err=>console.log('Fallo el servidor',err))

export const io = new Server(server)
 
