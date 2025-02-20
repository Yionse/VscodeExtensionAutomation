const { execSync } = require("child_process")
const {
  preCheck,
  typespecCompilerInstalled,
  node_modulesInstalled
} = require("./pre")
const { createDir } = require("../common/createDir")
const { createTypespecResult } = require("./result")
const {
  showCurrentDirectoryList
} = require("../common/showCurrentDirectoryList")
const { message, showInformation } = require("../common/message")
const { selectItem } = require("../common/selectItem")
const vscode = require("vscode")
const { sleep, countDown } = require("../common/timer")
const { keyboard, Key } = require("@nut-tree/nut-js")
const { log } = require("../common/log")

async function createNonBrandedTemplates({ name, config, description }) {
  message.start(`Start-${name}`)
  message.start(`Description-${JSON.stringify(description)}`)
  log(`\n\nStart-${name}`)
  log(`\n\nDescription-${JSON.stringify(description)}`)

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
  message.start("Creating a new TypeSpec project...")
  log("Creating a new TypeSpec project...")
  // Enter information to create a project
  vscode.commands.executeCommand("workbench.action.quickOpen")
  await sleep(1)
  vscode.env.clipboard
    .writeText(">TypeSpec: Create TypeSpec Project")
    .then(() => {
      vscode.commands.executeCommand("editor.action.clipboardPasteAction")
    })
  await sleep(1)
  await keyboard.pressKey(Key.Enter)
  await sleep(8)
  await keyboard.pressKey(Key.Enter)
  await sleep(1)
  if (!config.emptyFolder) {
    await selectItem()
    await sleep(1)
  }
  await sleep(8)
  // Create the project end

  // The first template is selected by default
  await selectItem()
  await sleep(1)

  // Enter the project name
  vscode.env.clipboard.writeText("AutomationProjectName").then(() => {
    vscode.commands.executeCommand("editor.action.clipboardPasteAction")
  })
  await sleep(1)
  await keyboard.pressKey(Key.Enter)
  await sleep(1)

  // Choose whether to generate a .gitignore file
  await selectItem(config.addGitignore ? "Yes" : "No")
  await sleep(1)
  await node_modulesInstalled()
  message.info("The generated directories and files are as follows:")
  log("The generated directories and files are as follows:")
  showCurrentDirectoryList()
  createTypespecResult(config.addGitignore)
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
  // Check the environment start
  // await sleep(3)
  // if (!preCheck()) {
  //   createTypespecResult()
  //   return
  // }
  // await sleep(3)
  // Check the environment end
  const configArrayList = [
    {
      name: "CreateTypespecProject-NonBrandedTemplates-Batch1",
      config: {
        emptyFolder: true,
        addGitignore: true
      },
      description: "The root directory is empty, Add ignore files"
    },
    {
      name: "CreateTypespecProject-NonBrandedTemplates-Batch2",
      config: {
        emptyFolder: false,
        addGitignore: false
      },
      description: "The root directory is not empty, Do not add ignore files"
    },
    {
      name: "CreateTypespecProject-NonBrandedTemplates-Batch3",
      config: {
        emptyFolder: false,
        addGitignore: true
      },
      description: "The root directory is not empty, Add ignore files"
    },
    {
      name: "CreateTypespecProject-NonBrandedTemplates-Batch4",
      config: {
        emptyFolder: true,
        addGitignore: false
      },
      description: "The root directory is empty, Do not add ignore files"
    }
  ]
  for (const config of configArrayList) {
    await createNonBrandedTemplates(config)
  }
}

module.exports = {
  createNonBrandedTemplatesBatch
}
