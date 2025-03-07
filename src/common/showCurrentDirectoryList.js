const { logger } = require("./log")
const { getScriptRoot } = require("./getScriptRoot")
const vscode = require("vscode")
const { execSync } = require("child_process")

function showCurrentDirectoryList() {
  const scriptPath = getScriptRoot("getRootDirectoryFileList.js")
  try {
    const stdout = execSync(`node ${scriptPath}`, {
      cwd: vscode.workspace.workspaceFolders[0].uri.fsPath,
      encoding: "utf8"
    })
    if (stdout) {
      const arr = JSON.parse(stdout)
      arr.forEach((item, index) =>
        logger.log({
          type: "file",
          msg: (index + 1 === arr.length ? "└─── " : "├─── ") + item.file
        })
      )
    }
  } catch (error) {
    throw new Error(`Execution error: ${error.message}`)
  }
}

module.exports = {
  showCurrentDirectoryList
}
