const { getScriptRoot } = require("./getScriptRoot")

const vscode = require("vscode")
const { execSync } = require("child_process")
const { message } = require("./message")
const { log } = require("./log")

function showCurrentDirectoryList() {
  const scriptPath = getScriptRoot("getRootDirectoryFileList.js")
  try {
    const stdout = execSync(`node ${scriptPath}`, {
      cwd: vscode.workspace.workspaceFolders[0].uri.fsPath,
      encoding: "utf8"
    })
    if (stdout) {
      const arr = JSON.parse(stdout)
      arr.forEach((item) => {
        if (item.type === "file") {
          message.file(item.file, true)
          log("file: " + item.file, "info")
        } else {
          message.directory(item.file, true)
          log("dict: "+item.file, "info")
        }
      })
    }
  } catch (error) {
    message.error(`Execution error: ${error.message}`)
    log(`Execution error: ${error.message}`, "error")
  }
}

module.exports = {
  showCurrentDirectoryList
}
