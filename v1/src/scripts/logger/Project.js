const winston = require("winston");

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'project-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'v1/src/logs/projects/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'v1/src/logs/projects/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'v1/src/logs/projects/warn.log', level: 'warn' }),
        new winston.transports.File({ filename: 'v1/src/logs/projects/combined.log' }),
    ],
});

module.exports=logger;