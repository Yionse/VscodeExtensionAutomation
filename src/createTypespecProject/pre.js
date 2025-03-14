const { getCurrentDirectoryList } = require("../common/getCurrentDirectoryList")
const { sleep } = require("../common/timer")
const { logger } = require("../common/log")
const { execSync } = require("child_process")

const preCheck = () => {
  logger.log({ type: "info", msg: `Checking the environment` })
  // node
  const nodeVersion = execSync("node -v").toString().trim()
  if (parseInt(nodeVersion.split(".")?.[0].replace("v", "")) < 20) {
    logger.log({ type: "error", msg: "Node version is too low" })
    return false
  }
  return true
}

const typespecCompilerInstalled = async (isInstall) => {
  while (true) {
    await sleep(10)
    const stdout = execSync("npm list -g --depth=0").toString()
    if (stdout.includes("@typespec/compiler") == isInstall) {
      break
    }
  }
}

const node_modulesInstalled = async (isNodeModules) => {
  while (true) {
    await sleep(1)
    const fileList = JSON.parse(getCurrentDirectoryList()) || []
    const specifyingFiles = isNodeModules
      ? fileList.filter(
          (item) =>
            item.file == "package-lock.json" || item.file === "node_modules"
        )
      : fileList.filter(
          (item) => item.file == "examples" || item.file === "main.tsp"
        )
    if (specifyingFiles.length === 2) {
      await sleep(3)
      break
    }
  }
}

module.exports = {
  preCheck,
  typespecCompilerInstalled,
  node_modulesInstalled
}
