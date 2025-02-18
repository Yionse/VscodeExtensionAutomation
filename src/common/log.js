const fs = require('fs');
const path = require('path');

function log(message, level = 'info', logPath = "D:/") {
    
    const filePath = path.join(logPath, 'log.txt');
    const logMessage = `${new Date().toISOString()} [${level.toUpperCase()}] - ${message}\n`;
    
    fs.appendFile(filePath, logMessage, { flag: 'a' }, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}


module.exports = { log }