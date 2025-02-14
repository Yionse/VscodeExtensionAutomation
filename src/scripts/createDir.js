const fs = require("fs")
const path = require("path")

const dir = process.argv[2]

const targetDir = path.join("D:\\", path.basename(dir))
fs.mkdirSync(targetDir, { recursive: true })
