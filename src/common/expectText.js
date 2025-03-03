const { sleep } = require("./timer")
const screenshot = require("screenshot-desktop")
const sharp = require("sharp")
const Tesseract = require("tesseract.js")
const fs = require("fs")

async function expectText(errMsg, str, position = "top") {
  const { activeWindow } = await import("active-win")
  const win = await activeWindow()
  const displays = await screenshot.listDisplays()

  let { x, y, width, height } = win.bounds
  x += 8
  y += 8

  let targetDisplay = null
  for (const display of displays) {
    const { left, top, right, bottom } = display

    if (x >= left && x <= right && y >= top && y <= bottom) {
      targetDisplay = display
      break
    }
  }

  let retry = 5
  let result = false
  while (retry > 0) {
    await sleep(2)
    retry--
    const img = await screenshot({ screen: targetDisplay.id })
    const buffer = Buffer.from(img)
    let topScreen = position === "top" ? y : height / 3
    const cropped = await sharp(buffer)
      .extract({
        left: x >= targetDisplay.width ? x - targetDisplay.width : x,
        top: topScreen,
        width: width - 20,
        height: 100
      })
      .toBuffer()
    const filePath = str + +new Date() + ".png"
    fs.writeFileSync("D:/typespecAutomationLogs/" + filePath, cropped)

    const {
      data: { text }
    } = await Tesseract.recognize(cropped, "eng")

    const currentText = text.replace(/\s+/g, "").toLowerCase()
    const targetText = str.replace(/\s+/g, "").toLowerCase()
    if (currentText.includes(targetText)) {
      result = true
      break
    }
  }
  if (!result) {
    throw new Error(errMsg)
  }
}

module.exports = {
  expectText
}
