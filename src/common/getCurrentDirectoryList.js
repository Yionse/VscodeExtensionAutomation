const { getScriptRoot } = require("./getScriptRoot")
const vscode = require("vscode")
const { execSync } = require("child_process")

const getCurrentDirectoryList = () => {
  const scriptPath = getScriptRoot("getRootDirectoryFileList.js")
  try {
    const res = execSync(`node ${scriptPath}`, {
      cwd: vscode.workspace.workspaceFolders[0].uri.fsPath,
      encoding: "utf8"
    })
    return res
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  getCurrentDirectoryList
}
