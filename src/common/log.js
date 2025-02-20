const fs = require("fs")
const path = require("path")
const moment = require("moment")

let fileName = "typespec-automation.log"

function setFileName(newFileName) {
  fileName = newFileName
}

function log(message, level = "info") {
  const logDir = "D:/typespecAutomationLogs/"
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
  }

  const filePath = path.join(logDir, fileName)
  let logMessage = `${moment().format(
    "YYYY-MM-DD HH:mm:ss"
  )} [${level.toUpperCase()}] - ${message}\n`
  if (level === "sys") {
    logMessage = message
  }
  fs.appendFileSync(filePath, logMessage)
}

module.exports = { log, setFileName }
