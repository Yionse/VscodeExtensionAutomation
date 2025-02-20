const vscode = require("vscode")
const {
  CreateTypespecProject,
  ImportTypespecFromOpenai3,
  GenerateFromTypespec,
  TypespecExtensionBasicFeatures
} = require("./src/TreeDataProviders")
const { showInformation } = require("./src/common/message")
const {
  createNonBrandedTemplatesBatch
} = require("./src/createTypespecProject/index")

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // create Provider/Item
  const createProvider = new CreateTypespecProject()
  const importProvider = new ImportTypespecFromOpenai3()
  const generateProvider = new GenerateFromTypespec()
  const featuresProvider = new TypespecExtensionBasicFeatures()

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
  vscode.window.registerTreeDataProvider(
    "typespec-extension-basic-features-test",
    featuresProvider
  )

  const Create_1 = vscode.commands.registerCommand(
    "typespec-automation.Create-1",
    () => createNonBrandedTemplatesBatch()
  )
  const Create_2 = vscode.commands.registerCommand(
    "typespec-automation.Create-2",
    () => {
      showInformation("Stay tuned")
    }
  )
  const Create_All = vscode.commands.registerCommand(
    "typespec-automation.Create-All",
    () => {
      showInformation("Stay tuned")
    }
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
  const Feature_1 = vscode.commands.registerCommand(
    "typespec-automation.Feature-1",
    () => {
      showInformation("Stay tuned")
    }
  )
  const Feature_2 = vscode.commands.registerCommand(
    "typespec-automation.Feature-2",
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
    Import_2,
    Feature_1,
    Feature_2
  )
  // vscode.commands.executeCommand("typespec-automation.Create-1")
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
