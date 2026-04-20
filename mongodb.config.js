import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const loggerFolder = path.join(dirname, "logs"); // I added a "logs" folder to keep it tidy
const loggerFile = path.join(loggerFolder, "logger.txt");

function logger(type, message) {
    try {
        // Create the folder if it doesn't exist
        if (!fs.existsSync(loggerFolder)) {
            fs.mkdirSync(loggerFolder, { recursive: true });
        }
        
        const log = `[${new Date().toLocaleString()}] ${type}: ${message}\n`;
        fs.appendFileSync(loggerFile, log);
    } catch (error) {
        console.log("Logging Error:", error);

         
    }
} 

export default logger;