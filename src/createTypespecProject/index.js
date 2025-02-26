const { configArrayList, templateList } = require("./config")
const { deleteFile } = require("../common/deleteFile")
const { expectText } = require("../common/expectText")
const { setFileName, log } = require("../common/log")
const { node_modulesInstalled } = require("./pre")
const { createDir } = require("../common/createDir")
const { createTypespecResult } = require("./result")
const {
  showCurrentDirectoryList
} = require("../common/showCurrentDirectoryList")
const { outputChannelSys } = require("../common/message")
const { selectItem } = require("../common/selectItem")
const vscode = require("vscode")
const { keyboard, Key } = require("@nut-tree/nut-js")
const moment = require("moment")

async function createTemplatesOperation({
  name,
  config,
  description,
  template
}) {
  try {
    outputChannelSys({
      msg: `Start-${name}`
    })
    outputChannelSys({
      msg: `Description-${JSON.stringify(description)}`
    })

    if (!config.emptyFolder) {
      createDir("testDirectory")
    }

    outputChannelSys({
      msg: "Creating a new TypeSpec project..."
    })
    vscode.commands.executeCommand("workbench.action.quickOpen")
    await expectText("Failed to open the top input box", "files")

    vscode.env.clipboard
      .writeText(">TypeSpec: Create TypeSpec Project")
      .then(() => {
        vscode.commands.executeCommand("editor.action.clipboardPasteAction")
      })
    await keyboard.pressKey(Key.Enter)
    await expectText("Failed to select folder", "folder")
    await keyboard.pressKey(Key.Enter)

    // Specific steps for some specific templates
    if (!config.emptyFolder) {
      await expectText(
        "The current root directory is not empty, and the next step cannot be selected",
        "empty"
      )
      await selectItem()
    }
    // Specific steps for some specific templates
    await expectText("No template selected", "template")

    await selectItem(template)
    vscode.env.clipboard.writeText("AutomationProjectName").then(() => {
      vscode.commands.executeCommand("editor.action.clipboardPasteAction")
    })
    await keyboard.pressKey(Key.Enter)

    await selectItem(config.addGitignore ? "Yes" : "No")

    // Specific steps for some specific templates
    if (template === "Generic REST API" || template.includes("(stand alone)")) {
      await selectItem()
      await selectItem()
    }
    if (template.includes("(rest-api-spec repo)")) {
      await selectItem()
    }
    // Specific steps for some specific templates

    await node_modulesInstalled(!template.includes("(rest-api-spec repo)"))
    outputChannelSys({
      msg: "The generated directories and files are as follows:"
    })
    showCurrentDirectoryList()
    createTypespecResult({
      name,
      template,
      isAddGitignore: config.addGitignore
    })
    return true
  } catch (error) {
    outputChannelSys({
      type: "error",
      msg: error.message
    })
    outputChannelSys({
      type: "error",
      msg: `${name}: Failed\n`
    })
    return false
  } finally {
    deleteFile()
  }
}

/**
 * Create multiple TypeSpec projects in batch
 * configArrayList - The array of configuration objects for each project to be created.
 * {
 *    name: Project name,
 *    config: {
 *       emptyFolder: true | false,
 *       notEmptyFolderContinue: true,  // Can only be true. If false, the project will not be created.
 *       addGitignore: true | false,
 *    },
 *    description: "Project description"
 * }
 */
async function createTemplates(name) {
  // Check the environment start
  // await sleep(3)
  // if (!preCheck()) {
  //   createTypespecResult()
  //   return
  // }
  // await sleep(3)
  // Check the environment end
  const startTime = +new Date()
  let successCount = 0
  let failCount = 0
  const fileName = `log-create${name}Templates-${+new Date()}.txt`
  setFileName(fileName)
  log(
    `====================================================================\nProjectName: create${name}Templates\nStartTime: ${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}\nTotalCase: ${
      configArrayList.length *
      templateList.filter((item) => item.type === name)?.length
    }\n====================================================================\n\n`,
    "sys"
  )

  for (const template of templateList
    .filter((item) => item.type === name)
    ?.map((item) => item.templateName)) {
    for (const [index, config] of configArrayList.entries()) {
      const isSuccess = await createTemplatesOperation({
        ...config,
        name: `${config.name}-${template}-Case${index + 1}`,
        template
      })
      if (isSuccess) {
        successCount++
      } else {
        failCount++
      }
    }
  }

  log(
    `====================================================================\nSuccessCount: ${successCount}\nFailCount: ${failCount}\nEndTime: ${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}\nTotalTime: ${
      (+new Date() - startTime) / 1000
    }s\n====================================================================`,
    "sys"
  )
}

module.exports = {
  createTemplates
}
