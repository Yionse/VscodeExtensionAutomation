const { getCurrentDirectoryList } = require("../common/getCurrentDirectoryList")
const { message } = require("../common/message")

const testCase1Result = () => {
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
      message.resSuccess("Test case 1: Success")
    } else {
      message.resError("Test case 1: Failed")
    }
  } catch (error) {
    message.info(error.message)
    message.resError("Test case 1: Failed")
  }
}

module.exports = {
  testCase1Result
}
