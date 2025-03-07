const { findKeyByErrorMsg } = require("../createTypespecProject/exceptList")
const moment = require("moment")
const { sleep } = require("./timer")
const screenshot = require("screenshot-desktop")
const sharp = require("sharp")
const Tesseract = require("tesseract.js")
const fs = require("fs")
const { mouse } = require("@nut-tree/nut-js")

async function expectText(config, position = "top") {
  const { activeWindow } = await import("active-win")
  const mousePos = await mouse.getPosition()
  const win = await activeWindow()
  const displays = await screenshot.listDisplays()

  let { x, y, width, height } = win.bounds
  x += 8
  y += 8

  let targetDisplay = null
  for (const display of displays) {
    if (
      mousePos.x >= display.left &&
      mousePos.x <= display.right &&
      mousePos.y >= display.top &&
      mousePos.y <= display.bottom
    ) {
      targetDisplay = display
      break
    }
  }

  let retry = 5
  let result = false
  let buffer = null
  while (retry > 0) {
    await sleep(2)
    retry--
    const img = await screenshot({ screen: targetDisplay.id })
    buffer = Buffer.from(img)
    let topScreen = position === "top" ? y : height / 3
    const cropped = await sharp(buffer)
      .extract({
        left: x >= targetDisplay.width ? x - targetDisplay.width : x,
        top: topScreen,
        width: width - 20,
        height: 100
      })
      .toBuffer()
    // let fileName = findKeyByErrorMsg(errMsg) + +new Date() + ".png"
    // fs.writeFileSync("D:/typespecAutomationLogs/" + fileName, cropped)

    const {
      data: { text }
    } = await Tesseract.recognize(cropped, "eng")

    const currentText = text.replace(/\s+/g, "").toLowerCase()
    const targetText = findKeyByErrorMsg(config.msg)
      .replace(/\s+/g, "")
      .toLowerCase()
    if (currentText.includes(targetText)) {
      result = true
      break
    }
  }
  if (!result) {
    const logDir = "D:/typespecAutomationLogs/"
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }
    let fileName =
      config.partName +
      "_" +
      findKeyByErrorMsg(config.msg).toLocaleUpperCase() +
      "_" +
      moment().format("YYYY_MM_DD_HH_mm_ss") +
      ".png"
    fs.writeFileSync(logDir + fileName, buffer)
    const fileMsg =
      `${moment().format(
        "YYYY-MM-DD HH:mm:ss"
      )} [ERROR] View error pictures for more details: ` + fileName
    throw new Error(config.msg + `\n${fileMsg}`)
  }
}

module.exports = {
  expectText
}
