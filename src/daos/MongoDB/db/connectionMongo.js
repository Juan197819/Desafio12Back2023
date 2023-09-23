import mongoose from "mongoose";
import config from "../../../config/configEnv.js";
import logger from "../../../config/configWinston.js";

try {
    let url
    if (config.NODE_ENV=='development') {
        url = 'mongodb://localhost:27017/ecommerceLocal'
        logger.http('Wait...Local MongoDB database connecting...')
    } else {
        url=config.MONGO_ATLAS
        logger.http('Wait... MongoDB ATLAS database in the cloud connecting...')
    }
    await mongoose.connect(url)
    logger.http('MongoDB Database connected!!')
} catch (error) {
    next()
}