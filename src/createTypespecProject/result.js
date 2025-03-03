const { templateList } = require("./config")
const { getCurrentDirectoryList } = require("../common/getCurrentDirectoryList")
const { outputChannelSys } = require("../common/message")
const { node_modulesInstalled } = require("./pre")
const {
  showCurrentDirectoryList
} = require("../common/showCurrentDirectoryList")

const createTypespecResult = async ({ isAddGitignore, name, template }) => {
  await node_modulesInstalled(!template.includes("(rest-api-spec repo)"))
  outputChannelSys({
    msg: "The generated directories and files are as follows:"
  })
  showCurrentDirectoryList()

  let expectedResults = templateList
    .find((item) => item.templateName === template)
    ?.resultList.map((item) => item)

  if (isAddGitignore) {
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
      outputChannelSys({
        type: "success",
        msg: `${name}: Success\n`
      })
    } else {
      throw new Error(`Number of files does not match`)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  createTypespecResult
}
