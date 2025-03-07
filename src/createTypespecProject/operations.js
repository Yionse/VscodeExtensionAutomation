const { sleep } = require("../common/timer")
const { logger } = require("../common/log")
const { selectItem } = require("../common/selectItem")
const { expectText } = require("../common/expectText")
const { exceptTextErrorList } = require("./exceptList")
const { createDir } = require("../common/createDir")
const vscode = require("vscode")
const { keyboard, Key } = require("@nut-tree/nut-js")

// Select a template
const selectTemplate = async ({ template, isEmptyFolder }) => {
  if (!isEmptyFolder) {
    await selectItem()
  }
  await expectText(exceptTextErrorList.template)
  await selectItem(template)
}

// Select libraries to update is required only when you select Generic REST API. This step will not appear if you select other templates.
const specialStepsAzure = async (template) => {
  if (template === "Generic REST API" || template.includes("(stand alone)")) {
    await selectItem()
    await selectItem()
  }
  if (template.includes("(rest-api-spec repo)")) {
    await selectItem()
  }
}

// Trigger create TypeSpec Project
const triggerCreateProject = async ({ name, description, isEmptyFolder }) => {
  logger.log({
    msg: `Start-${name}`
  })
  logger.log({
    msg: `Description-${JSON.stringify(description)}`
  })

  if (!isEmptyFolder) {
    createDir("testDirectory")
  }

  logger.log({
    msg: "Creating a new TypeSpec project..."
  })
  vscode.commands.executeCommand("workbench.action.quickOpen")
  await expectText(exceptTextErrorList.search)

  vscode.env.clipboard
    .writeText(">TypeSpec: Create TypeSpec Project")
    .then(() => {
      vscode.commands.executeCommand("editor.action.clipboardPasteAction")
    })
  await keyboard.pressKey(Key.Enter)
  await expectText(exceptTextErrorList.folder)
  await keyboard.pressKey(Key.Enter)
}

// Input project name and choose whether to generate a .gitignore file
const typingName = async (isAddGitignore) => {
  vscode.env.clipboard.writeText("AutomationProjectName").then(() => {
    vscode.commands.executeCommand("editor.action.clipboardPasteAction")
  })
  await keyboard.pressKey(Key.Enter)
  await selectItem(isAddGitignore ? "Yes" : "No")
}

module.exports = {
  triggerCreateProject,
  selectTemplate,
  typingName,
  specialStepsAzure
}
