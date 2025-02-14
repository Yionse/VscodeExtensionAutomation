const { message } = require("../common/message")
const { execSync } = require("child_process")

const preCheck = () => {
  // node
  const nodeVersion = execSync("node -v").toString().trim()
  if (parseInt(nodeVersion.split(".")?.[0].replace("v", "")) < 20) {
    message.error("Node version is too low")
    return false
  }
  execSync("npm install -g @typespec/compiler")
}

module.exports = {
  preCheck
}
