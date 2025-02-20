const { getCurrentDirectoryList } = require("../common/getCurrentDirectoryList")
const { message } = require("../common/message")
const { log } = require("../common/log")

const createTypespecResult = (isAddIgnore) => {
  const expectedResults = ["main.tsp", "package.json", "tspconfig.yaml"]
  if (isAddIgnore) {
    expectedResults.push(".gitignore")
  }
  try {
    const currentDirectoryList = JSON.parse(getCurrentDirectoryList()).filter(
      (item) =>
        item.file !== "package-lock.json" &&
        item.file !== "node_modules" &&
        item.file !== "testDirectory"
    )
    if (currentDirectoryList.length === expectedResults.length) {
      message.resSuccess("CreateTypespecProject-NonBrandedTemplates: Success")
      log("CreateTypespecProject-NonBrandedTemplates: Success")
    } else {
      message.resError("CreateTypespecProject-NonBrandedTemplates: Failed")
      log("CreateTypespecProject-NonBrandedTemplates: Failed", "error")
    }
  } catch (error) {
    message.info(error.message)
    log(error.message, "error")
    message.resError("CreateTypespecProject-NonBrandedTemplates: Failed")
    log("CreateTypespecProject-NonBrandedTemplates: Failed", "error")
  }
}

module.exports = {
  createTypespecResult
}
