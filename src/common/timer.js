const { outputChannelSys } = require("./message")

const sleep = (second) =>
  new Promise((resolve) => setTimeout(resolve, second * 1000))

const countDown = async (second) => {
  for (let i = second; i >= 1; i--) {
    outputChannelSys({ type: "info", msg: `waiting ${i}` })
    await sleep(1)
  }
}

module.exports = {
  sleep,
  countDown
}
