const { log } = require("./log")
const vscode = require("vscode")
const moment = require("moment")

const outputChannel = vscode.window.createOutputChannel("My Plugin Output")
outputChannel.show(true)

const outputChannelSys = ({ type = "info", msg, tab = false }) => {
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss")
  outputChannel.appendLine(
    `${timestamp} [${type.toUpperCase()}] ` + (tab ? "\t" : "") + msg
  )
  log(msg, type)
}

const showInformation = (msg) => {
  vscode.window.showInformationMessage(msg)
}

module.exports = { outputChannelSys, showInformation }
