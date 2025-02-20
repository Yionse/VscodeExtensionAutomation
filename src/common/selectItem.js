const { keyboard, Key } = require("@nut-tree/nut-js")
const { sleep } = require("./timer")
const vscode = require("vscode")

async function selectItem(target = "") {
  if (target) {
    vscode.env.clipboard.writeText(target).then(() => {
      vscode.commands.executeCommand("editor.action.clipboardPasteAction")
    })
    await sleep(1)
    await keyboard.pressKey(Key.Enter)
  } else {
    vscode.commands.executeCommand(
      "workbench.action.acceptSelectedQuickOpenItem"
    )
  }
}

module.exports = {
  selectItem
}
