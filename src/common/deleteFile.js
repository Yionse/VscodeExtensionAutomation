const { getScriptRoot } = require("./getScriptRoot")
const vscode = require("vscode")
const { execSync } = require("child_process")

const deleteFile = () => {
  const scriptPath = getScriptRoot("deleteAllFIle.js")
  try {
    execSync(
      `node ${scriptPath} ${vscode.workspace.workspaceFolders[0].uri.fsPath}`,
      {
        cwd: vscode.workspace.workspaceFolders[0].uri.fsPath,
        encoding: "utf8"
      }
    )
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  deleteFile
}
