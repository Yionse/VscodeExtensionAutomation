const vscode = require("vscode")

const outputChannel = vscode.window.createOutputChannel("My Plugin Output")
outputChannel.show(true)

const message = {
  outputChannel: () => outputChannel,
  start: (msg) => outputChannel.appendLine(`🚀 ${msg}`),
  info: (msg, tab = false) =>
    outputChannel.appendLine(`${tab ? "\t" : ""}📢 ${msg}`),
  directory: (msg, tab = false) =>
    outputChannel.appendLine(`${tab ? "\t" : ""}📂 ${msg}`),
  file: (msg, tab = false) =>
    outputChannel.appendLine(`${tab ? "\t" : ""}📄 ${msg}`),
  wait: (msg) => outputChannel.appendLine(`⏳ ${msg}`),
  resSuccess: (msg) => outputChannel.appendLine(`✅✅✅ ${msg} ✅✅✅\n\n`),
  resError: (msg) => outputChannel.appendLine(`❌❌❌ ${msg} ❌❌❌\n\n`)
}

const showInformation = (msg) => {
  vscode.window.showInformationMessage(msg)
}

module.exports = { message, showInformation }
