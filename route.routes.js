import logger from "../middleaware/logger.js";

const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const { method, url } = req;
        const statusCode = res.statusCode;
        
        const logMessage = `${method} ${url} ${statusCode} - ${duration}ms`;
        logger("HTTP", logMessage);
    });


      
    next();
};

export default requestLogger;