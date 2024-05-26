const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, printf } = format;

// Define a custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

// Create a Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }), // Customize timestamp format
        logFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
});

// Log messages
logger.info('Info message');
logger.error('Error message');
logger.warn('Warning message');
