import { createLogger, format, transports } from 'winston' 

const { combine, timestamp, json, colorize } = format;

const consoleLogFromat = format.combine(
    format.colorize(),
    format.printf(({ level, message, timestamp }) => {
        return `${level} : ${message} ${timestamp}`;

    })
);

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
    ),
    transports: [
        new transports.Console({ format: consoleLogFromat }),
        new transports.File({ filename: 'app.log' })
    ]
})

export default logger;