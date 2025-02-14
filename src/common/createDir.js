const { getScriptRoot } = require("./getScriptRoot")
const vscode = require("vscode")
const { execSync } = require("child_process")

const createDir = (dirName) => {
  const scriptPath = getScriptRoot("createDir.js")
  try {
    execSync(`node ${scriptPath} ${dirName}`, {
      cwd: vscode.workspace.workspaceFolders[0].uri.fsPath,
      encoding: "utf8"
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  createDir
}
