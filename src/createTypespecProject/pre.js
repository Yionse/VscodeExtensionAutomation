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
  execSync("npm install -g @typespec/compiler")
  return true
}

module.exports = {
  preCheck
}
