const { preCheck } = require("./pre")
const { createDir } = require("../common/createDir")
const { createTypespecResult } = require("./result")
const {
  showCurrentDirectoryList
} = require("../common/showCurrentDirectoryList")
const { message } = require("../common/message")
const { selectItem } = require("../common/selectItem")
const vscode = require("vscode")
const { sleep } = require("../common/timer")
const { keyboard, Key } = require("@nut-tree/nut-js")

async function createNonBrandedTemplates() {
  message.start(`Start-CreateTypespecProject-NonBrandedTemplates`)
  await sleep(3)
  if (!preCheck()) {
    createTypespecResult()
    return
  }
  await sleep(3)

  // Specify the current working directory
  vscode.commands.executeCommand(
    "vscode.openFolder",
    vscode.Uri.file(`D:\\test`)
  )
  message.start("Creating a new TypeSpec project...")
  // Enter information to create a project
  vscode.commands.executeCommand("workbench.action.quickOpen")
  await sleep(3)

  vscode.env.clipboard
    .writeText(">TypeSpec: Create TypeSpec Project")
    .then(() => {
      vscode.commands.executeCommand("editor.action.clipboardPasteAction")
    })
  await sleep(3)
  await keyboard.pressKey(Key.Enter)
  await sleep(8)
  await keyboard.pressKey(Key.Enter)
  await sleep(3)

  // The first template is selected by default
  selectItem()
  await sleep(3)

  // Enter the project name
  vscode.env.clipboard.writeText("AutomationProjectName").then(() => {
    vscode.commands.executeCommand("editor.action.clipboardPasteAction")
  })
  await sleep(3)
  await keyboard.pressKey(Key.Enter)
  await sleep(3)

  // Choose whether to generate a .gitignore file
  selectItem()
  await sleep(3)
  message.info("The generated directories and files are as follows:")
  showCurrentDirectoryList()
  createTypespecResult()
}

module.exports = {
  createNonBrandedTemplates
}
