const path = require("path")
const fs = require("fs")
const moment = require("moment")
const vscode = require("vscode")

const outputChannel = vscode.window.createOutputChannel(
  "TypespecAutomationTest"
)
outputChannel.show(true)

const showInformation = (msg) => {
  vscode.window.showInformationMessage(msg)
}

class Logger {
  constructor(fileName) {
    this.fileName = fileName
    this.logList = {}
    this.currentCase = null
  }

  setStartTime(startTime) {
    this.startTime = startTime
  }

  setFileName(fileName) {
    this.fileName = fileName
  }

  setCase(caseName) {
    this.currentCase = caseName
    if (!this.logList[caseName]) {
      this.logList[caseName] = { status: null, messages: [] }
    }
  }

  log({ type = "info", msg }) {
    if (!this.currentCase) {
      throw new Error("No case set. Use setCase(caseName) first.")
    }
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss")
    const message = `${timestamp} [${type.toUpperCase()}] ` + msg
    outputChannel.appendLine(message)
    this.logList[this.currentCase].messages.push(message)
  }

  setStatus(isSuccess) {
    if (!this.currentCase) {
      throw new Error("No case set. Use setCase(caseName) first.")
    }
    this.logList[this.currentCase].status = isSuccess ? "success" : "failed"
  }

  writeLog() {
    const logDir = "D:/typespecAutomationLogs/"
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }
    const successCases = []
    const failedCases = []
    let logContent = ""
    Object.entries(this.logList).forEach(([_, { status, messages }]) => {
      const caseLog = messages.join("\n")
      if (status === "success") {
        successCases.push(caseLog)
      } else {
        failedCases.push(caseLog)
      }
    })

    logContent += `${"=".repeat(68)}\nProjectName: ${
      this.fileName.split("-")?.[0]
    }\nStartTime: ${this.startTime}\nTotalCase: ${
      Object.entries(this.logList).length
    }\nSuccessCount: ${successCases.length}\nFailCount: ${
      failedCases.length
    }\nEndTime: ${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}\nTotalTime: ${moment().diff(this.startTime, "seconds")}s\n${"=".repeat(
      68
    )}\n\n`

    if (successCases.length > 0) {
      logContent +=
        "=".repeat(68) +
        "\nSuccess Cases:\n\n" +
        successCases.join("\n\n") +
        "=".repeat(68) +
        "\n\n"
    }

    if (failedCases.length > 0) {
      logContent +=
        "=".repeat(68) +
        "\nFailed  Cases:\n\n" +
        failedCases.join("\n\n") +
        "=".repeat(68) +
        "\n\n"
    }

    fs.writeFileSync(path.join(logDir, this.fileName), logContent, "utf8")
  }
}

const logger = new Logger()

module.exports = { showInformation, logger }
