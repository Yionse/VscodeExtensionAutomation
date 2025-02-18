const { getCurrentDirectoryList } = require("../common/getCurrentDirectoryList")
const { message } = require("../common/message")
const { log } = require("../common/log")

const createTypespecResult = () => {
  const expectedResults = [
    ".gitignore",
    "main.tsp",
    "package.json",
    "tspconfig.yaml"
  ]
  try {
    const currentDirectoryList = JSON.parse(getCurrentDirectoryList()).filter(
      (item) =>
        item.file !== "package-lock.json" && item.file !== "node_modules"
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
