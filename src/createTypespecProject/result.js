const { getCurrentDirectoryList } = require("../common/getCurrentDirectoryList")
const { message } = require("../common/message")

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
    } else {
      message.resError("CreateTypespecProject-NonBrandedTemplates: Failed")
    }
  } catch (error) {
    message.info(error.message)
    message.resError("CreateTypespecProject-NonBrandedTemplates: Failed")
  }
}

module.exports = {
  createTypespecResult
}
