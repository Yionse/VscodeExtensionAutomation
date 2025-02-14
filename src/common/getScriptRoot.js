const path = require("path")
const vscode = require("vscode")

function getScriptRoot(scriptName) {
  const extensionPath = vscode.extensions.getExtension(
    "v-zhangtianc.typespec-automation"
  ).extensionPath
  const scriptPath = path.join(extensionPath, "src/scripts", scriptName)
  return scriptPath
}
module.exports = { getScriptRoot }
