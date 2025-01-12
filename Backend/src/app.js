import express from 'express';
import logger from '../logger.js';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat, {
    stream: {
        write:(message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3]
            };
            logger.info(JSON.stringify(logObject));
        }
    }
}));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static('public'))
app.use(cookieParser());


//import routes
import userRoutes from "./routes/user.routes.js"
import membershipplanRoutes from "./routes/membership.routes.js"
import attendanceRoutes from "./routes/attendance.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import workoutRoutes from "./routes/workout.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import productRoutes from "./routes/products.routes.js";
import contactRoutes from "./routes/contact.routes.js";

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/membership',membershipplanRoutes);
app.use('/api/v1/attendance',attendanceRoutes);
app.use("/api/v1/admin",adminRoutes);
app.use("/api/v1/workout",workoutRoutes);
app.use("/api/v1/progress",progressRoutes);
app.use("/api/v1/product",productRoutes);
app.use("/api/v1/contact",contactRoutes);
export default app;