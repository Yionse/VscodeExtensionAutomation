const vscode = require("vscode")

function selectItem() {
  vscode.commands.executeCommand("workbench.action.acceptSelectedQuickOpenItem")
}

module.exports = {
  selectItem
}
