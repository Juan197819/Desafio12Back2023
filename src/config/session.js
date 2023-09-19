import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from './configEnv.js';
if (config.PERSISTENCE == 'MongoDB') import('../../src/daos/MongoDB/db/connectionMongo.js')

let mongoUrl = config.MONGO_ATLAS
if (config.NODE_ENV == 'development') mongoUrl = 'mongodb://localhost:27017/ecommerceLocal'

export const configSession = session({
    secret: '1234',
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        // ttl: 10
    }),
    rolling: true,
    cookie: {
        // maxAge: 100000
    }
})