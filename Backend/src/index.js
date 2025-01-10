import app from "./app.js";
import dotenv from "dotenv";
import logger from "../logger.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "../.env"
})

const PORT = process.env.PORT || 8000;

connectDB()
.then(
    app.listen(PORT, () => {
        console.log("Successfully connected");
        logger.info(`Successfully started to the application.\n Listening on the port ${PORT} `)
    })
)
.catch(error => {
    logger.error("Error in connecting to the database :" + error);
    process.exit(1);
})


