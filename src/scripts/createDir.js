const fs = require("fs")

const targetDir = process.argv[2]

fs.mkdirSync(targetDir, { recursive: true })
