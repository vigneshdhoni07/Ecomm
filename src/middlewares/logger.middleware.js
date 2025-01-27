import fs from "fs";
import winston from "winston";

const fsPromises=fs.promises

async function log(logData){
    try {
        logData=new Date().toLocaleString()+" Log Data is:"+logData+"\n"
        fsPromises.appendFile("log.txt",logData)
    } catch (error) {
        console.log(error)
    }
}

let logger=winston.createLogger({
    level:"info",
    format:winston.format.json(),
    transports:[new winston.transports.File({filename:"logs.log",level:"info"})] 
})
async function loggerMiddleware(req,res,next){
    try {
        if(!(req.url.match(/signin/i) || req.url.includes("signup"))){
        let logData=`url :${req.url} reqBody:${JSON.stringify(req.body)}`
        // await log(logData)
        logger.info(logData)
        }
        next()
    } catch (error) {
        res.send(error)
    }
}

export default loggerMiddleware