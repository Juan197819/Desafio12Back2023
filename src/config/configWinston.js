import winston, {format} from "winston"
import config from "./configEnv.js"
import __dirname from "../../utils.js"

const confiLevels = {
    levels: {
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    colors: {
        fatal:'red bold',
        error:'magenta bold',
        warning:'yellow bold',
        info:'green bold',
        http:'blue bold',
        debug:'grey strikethrough'
    }
}

const loggerDev = winston.createLogger({
    levels: confiLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: format.combine(
                format.timestamp({format: 'MM-DD-YYYY HH:MM:SS'}),
                format.printf(info=>`[${info.level}] | ${info.timestamp} | ${info.message}`),
                format.colorize({ all: true, colors: confiLevels.colors, timestamp: true }),
            )    
        })
    ]
})
const loggerProd = winston.createLogger({
    levels: confiLevels.levels,
    transports: [
        new winston.transports.Console({ 
            level: "info",
            format: format.combine(
                format.timestamp({ format: 'MM-DD-YYYY HH:MM:SS' }),
                format.printf(info => `[${info.level}] | ${info.timestamp} | ${info.message}`),
                format.colorize({ all: true, colors: confiLevels.colors, timestamp: true }),
                    )
                }
                ),
        new winston.transports.File({
            filename: __dirname +'/src/logs/errors.log', 
            level: "error",
            format: format.combine(
                format.timestamp({ format: 'MM-DD-YYYY HH:MM:SS' }),
                format.printf(info => `[${info.level}] | ${info.timestamp} | ${info.message}`),
            )    
        }), 
    ]
})

let logger = loggerProd
if (config.NODE_ENV == 'production') logger = loggerProd

logger.fatal(__dirname + '/logs/errors.log');
logger.error('mensaje con nivel warn');
logger.warning('mensaje con nivel warn');
logger.info('mensaje con nivel info');
logger.http('mensaje con nivel http');
logger.debug('mensaje con nivel debug');
export default logger