import mongoose from "mongoose";
import config from "../../../config/configEnv.js";
try {
    let url
    if (config.NODE_ENV=='development') {
        url = 'mongodb://localhost:27017/ecommerceLocal'
        console.log('Wait...Local MongoDB database connecting...')
    } else {
        url=config.MONGO_ATLAS
        console.log('Wait... MongoDB ATLAS database in the cloud connecting...')
    }
    await mongoose.connect(url)
    console.log('MongoDB Database connected!!')
} catch (error) {
    throw error
}