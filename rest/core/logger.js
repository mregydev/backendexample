const winston=require('winston')

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
          })
    ]
});


module.exports = {
    log: (errorObject) => {
        errorObject.time=new Date()
        logger.log('error',errorObject)
    }
}