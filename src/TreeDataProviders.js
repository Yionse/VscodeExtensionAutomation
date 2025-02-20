const vscode = require("vscode")

class MyTreeItem extends vscode.TreeItem {
  constructor(label, command) {
    super(label, vscode.TreeItemCollapsibleState.None)
    this.command = {
      command: "typespec-automation." + command,
      title: label
    }
  }
}

class BaseTreeProvider {
  constructor(items) {
    this.items = items
  }

  getTreeItem(element) {
    return element
  }

  getChildren() {
    return this.items
  }
}

class CreateTypespecProject extends BaseTreeProvider {
  constructor() {
    super([
      new MyTreeItem("Create-non-branded-templates", "Create-1"),
      new MyTreeItem("Create-azure-data/Mgmt-templates", "Create-2"),
      new MyTreeItem("Create-all", "Create-All")
    ])
  }
}

class GenerateFromTypespec extends BaseTreeProvider {
  constructor() {
    super([
      new MyTreeItem("TestCase-1", "Generate-1"),
      new MyTreeItem("TestCase-2", "Generate-2")
    ])
  }
}

class ImportTypespecFromOpenai3 extends BaseTreeProvider {
  constructor() {
    super([
      new MyTreeItem("TestCase-1", "Import-1"),
      new MyTreeItem("TestCase-2", "Import-2")
    ])
  }
}

class TypespecExtensionBasicFeatures extends BaseTreeProvider {
  constructor() {
    super([
      new MyTreeItem("TestCase-1", "Feature-1"),
      new MyTreeItem("TestCase-2", "Feature-2")
    ])
  }
}

module.exports = {
  CreateTypespecProject,
  GenerateFromTypespec,
  ImportTypespecFromOpenai3,
  TypespecExtensionBasicFeatures
}
