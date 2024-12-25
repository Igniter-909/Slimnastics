import mongoose from "mongoose";
import logger from "../../logger.js";
import {DB_NAME} from "../constants.js"

// Connect to MongoDB
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        logger.info(`Successfully connected to Database ${connectionInstance.connection.host}`)
    } catch (error) {
        logger.error(`Error connecting to Database `)
        process.exit(1);
    }
}

export default connectDB;
