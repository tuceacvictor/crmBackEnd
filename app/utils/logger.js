const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
        winston.format.printf((info) => {
            const infoLevel = info.level === 'error' ? 'ERR' : info.level === 'warning' ? 'WRN' : 'MSG'
            return `${info.timestamp}, ${infoLevel}: ${info.message}`
        })
    ),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'log/log.log'}),
    ]
});

module.exports = logger;