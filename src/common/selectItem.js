const { keyboard, Key } = require("@nut-tree/nut-js")
const { sleep } = require("./timer")
const vscode = require("vscode")

async function selectItem(target = "") {
  await sleep(1)
  if (target) {
    vscode.env.clipboard.writeText(target).then(() => {
      vscode.commands.executeCommand("editor.action.clipboardPasteAction")
    })
    await sleep(1)
    await keyboard.pressKey(Key.Enter)
  } else {
    await keyboard.pressKey(Key.Enter)
  }
}

module.exports = {
  selectItem
}
