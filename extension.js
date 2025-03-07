const { showInformation } = require("./src/common/log")
const vscode = require("vscode")
const {
  CreateTypespecProject,
  ImportTypespecFromOpenai3,
  GenerateFromTypespec
} = require("./src/TreeDataProviders")
const { createTemplates } = require("./src/createTypespecProject/index")

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // create Provider/Item
  const createProvider = new CreateTypespecProject()
  const importProvider = new ImportTypespecFromOpenai3()
  const generateProvider = new GenerateFromTypespec()

  vscode.window.registerTreeDataProvider(
    "create-typespec-project-test",
    createProvider
  )
  vscode.window.registerTreeDataProvider(
    "generate-from-typespec-test",
    importProvider
  )
  vscode.window.registerTreeDataProvider(
    "import-typespec-from-openapi3-test",
    generateProvider
  )

  const Create_1 = vscode.commands.registerCommand(
    "typespec-automation.Create-1",
    () => createTemplates("NonBranded")
  )
  const Create_2 = vscode.commands.registerCommand(
    "typespec-automation.Create-2",
    () => createTemplates("AzurePlan")
  )
  const Create_All = vscode.commands.registerCommand(
    "typespec-automation.Create-All",
    () => createTemplates()
  )
  const Generate_1 = vscode.commands.registerCommand(
    "typespec-automation.Generate-1",
    () => {
      showInformation("Stay tuned")
    }
  )
  const Generate_2 = vscode.commands.registerCommand(
    "typespec-automation.Generate-2",
    () => {
      showInformation("Stay tuned")
    }
  )
  const Import_1 = vscode.commands.registerCommand(
    "typespec-automation.Import-1",
    () => {
      showInformation("Stay tuned")
    }
  )
  const Import_2 = vscode.commands.registerCommand(
    "typespec-automation.Import-2",
    () => {
      showInformation("Stay tuned")
    }
  )
  context.subscriptions.push(
    Create_1,
    Create_2,
    Create_All,
    Generate_1,
    Generate_2,
    Import_1,
    Import_2
  )
  // vscode.commands.executeCommand("typespec-automation.Create-1")
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
