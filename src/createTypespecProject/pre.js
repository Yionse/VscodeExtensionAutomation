const { getCurrentDirectoryList } = require("../common/getCurrentDirectoryList")
const { sleep } = require("../common/timer")
const { message } = require("../common/message")
const { execSync } = require("child_process")
const { log } = require("../common/log")

const preCheck = () => {
  message.start(`Checking the environment`)
  log(`Checking the environment`)
  // node
  const nodeVersion = execSync("node -v").toString().trim()
  if (parseInt(nodeVersion.split(".")?.[0].replace("v", "")) < 20) {
    message.error("Node version is too low")
    log(`Node version is too low`, "error")
    return false
  }
  execSync("npm i -g rimraf")
  return true
}

const typespecCompilerInstalled = async (isInstall) => {
  while (true) {
    await sleep(10)
    const stdout = execSync("npm list -g --depth=0").toString()
    if (stdout.includes("@typespec/compiler") == isInstall) {
      message.info(
        `@typespec/compiler ${isInstall ? "installed" : "not installed"}`
      )
      message.info(stdout)
      break
    }
  }
}

const node_modulesInstalled = async () => {
  while (true) {
    await sleep(1)
    const nodeModules = JSON.parse(getCurrentDirectoryList()).filter(
      (item) => item.file == "package-lock.json" || item.file === "node_modules"
    )
    if (nodeModules.length === 2) {
      break
    }
  }
}

module.exports = {
  preCheck,
  typespecCompilerInstalled,
  node_modulesInstalled
}
