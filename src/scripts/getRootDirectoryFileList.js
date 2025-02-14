const fs = require("fs")
const path = require("path")

const rootDirectory = process.cwd()
const files = fs.readdirSync(rootDirectory)
const result = []
files.forEach((file) => {
  const filePath = path.join(rootDirectory, file)
  const stat = fs.statSync(filePath)
  if (stat.isFile()) {
    result.push({ file, type: "file" })
  } else if (stat.isDirectory()) {
    result.push({ file, type: "directory" })
  }
})
console.log(JSON.stringify(result))
