const { expectText } = require("../common/expectText")
const { setFileName, log } = require("../common/log")
const { execSync } = require("child_process")
const { node_modulesInstalled } = require("./pre")
const { createDir } = require("../common/createDir")
const { createTypespecResult } = require("./result")
const {
  showCurrentDirectoryList
} = require("../common/showCurrentDirectoryList")
const { outputChannelSys } = require("../common/message")
const { selectItem } = require("../common/selectItem")
const vscode = require("vscode")
const { sleep } = require("../common/timer")
const { keyboard, Key } = require("@nut-tree/nut-js")
const moment = require("moment")

async function createNonBrandedTemplates({ name, config, description }) {
  outputChannelSys({
    msg: `Start-${name}`
  })
  outputChannelSys({
    msg: `Description-${JSON.stringify(description)}`
  })

  try {
    execSync("rimraf ./", {
      cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
    })
  } catch (error) {}

  // Create the directory start
  if (!config.emptyFolder) {
    createDir("testDirectory")
  }
  // Create the directory end

  // Create the project start
  outputChannelSys({
    msg: "Creating a new TypeSpec project..."
  })
  // Enter information to create a project
  vscode.commands.executeCommand("workbench.action.quickOpen")
  await expectText("The top pop-up box does not pop up", "files")

  vscode.env.clipboard
    .writeText(">TypeSpec: Create TypeSpec Project")
    .then(() => {
      vscode.commands.executeCommand("editor.action.clipboardPasteAction")
    })
  await expectText("", "typespec")
  await keyboard.pressKey(Key.Enter)
  await expectText("The folder selection box does not pop up", "folder")
  await keyboard.pressKey(Key.Enter)
  if (!config.emptyFolder) {
    await expectText(
      "Unselect whether to continue using the current folder as the project root directory",
      "empty"
    )
    await selectItem()
  }
  await expectText("Please Select a template Error", "template")
  // Create the project end

  // The first template is selected by default
  await selectItem()

  // Enter the project name
  vscode.env.clipboard.writeText("AutomationProjectName").then(() => {
    vscode.commands.executeCommand("editor.action.clipboardPasteAction")
  })
  await keyboard.pressKey(Key.Enter)

  // Choose whether to generate a .gitignore file
  await selectItem(config.addGitignore ? "Yes" : "No")
  await node_modulesInstalled()
  outputChannelSys({
    msg: "The generated directories and files are as follows:"
  })
  showCurrentDirectoryList()
  try {
    createTypespecResult(config.addGitignore, name)
    return true
  } catch (error) {
    return false
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
async function createNonBrandedTemplatesBatch() {
  const startTime = +new Date()
  const configArrayList = [
    {
      name: "CreateTypespecProject-NonBrandedTemplates-EmptyProject-Case1",
      config: {
        emptyFolder: true,
        addGitignore: true
      },
      description: "The root directory is empty, Add ignore files"
    },
    {
      name: "CreateTypespecProject-NonBrandedTemplates-EmptyProject-Case2",
      config: {
        emptyFolder: false,
        addGitignore: false
      },
      description: "The root directory is not empty, Do not add ignore files"
    },
    {
      name: "CreateTypespecProject-NonBrandedTemplates-EmptyProject-Case3",
      config: {
        emptyFolder: false,
        addGitignore: true
      },
      description: "The root directory is not empty, Add ignore files"
    },
    {
      name: "CreateTypespecProject-NonBrandedTemplates-EmptyProject-Case4",
      config: {
        emptyFolder: true,
        addGitignore: false
      },
      description: "The root directory is empty, Do not add ignore files"
    }
  ]
  let successCount = 0
  let failCount = 0
  const fileName = `log-createNonBrandedTemplates-${+new Date()}.txt`
  setFileName(fileName)
  log(
    `====================================================================\nProjectName: createNonBrandedTemplatesBatch\nStartTime: ${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}\nTotalCase: ${
      configArrayList.length
    }\n====================================================================\n`,
    "sys"
  )
  // Check the environment start
  // await sleep(3)
  // if (!preCheck()) {
  //   createTypespecResult()
  //   return
  // }
  // await sleep(3)
  // Check the environment end

  for (const config of configArrayList) {
    const isSuccess = await createNonBrandedTemplates(config)
    if (isSuccess) {
      successCount++
    } else {
      failCount++
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
  createNonBrandedTemplatesBatch
}
