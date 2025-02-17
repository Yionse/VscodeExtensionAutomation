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
  success: (msg, tab = false) =>
    outputChannel.appendLine(`${tab ? "\t" : ""}✅ ${msg}`),
  error: (msg) => outputChannel.appendLine(`❌ ${msg}`),
  warning: (msg) => outputChannel.appendLine(`⚠️ ${msg}`),
  resSuccess: (msg) => outputChannel.appendLine(`✅✅✅✅${msg} ✅✅✅✅✅`),
  resError: (msg) => outputChannel.appendLine(`❌❌❌❌ ${msg} ❌❌❌❌`)
}

const showInformation = (msg) => {
  vscode.window.showInformationMessage(msg)
}

module.exports = { message, showInformation }
