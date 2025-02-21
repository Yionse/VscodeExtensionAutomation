const { getCurrentDirectoryList } = require("../common/getCurrentDirectoryList")
const { outputChannelSys } = require("../common/message")

const createTypespecResult = (isAddIgnore, name) => {
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
      outputChannelSys({
        type: "success",
        msg: `${name}: Success\n`
      })
    } else {
      throw new Error()
    }
  } catch (error) {
    outputChannelSys({
      type: "error",
      msg: `${name}: Failed\n`
    })
  }
}

module.exports = {
  createTypespecResult
}
