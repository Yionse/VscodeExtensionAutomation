const fs = require("fs");
const path = require("path");

const targetDir = process.argv[2]

function deleteAllFilesAndFolders(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      deleteAllFilesAndFolders(itemPath);
      fs.rmdirSync(itemPath);
    } else {
      fs.unlinkSync(itemPath);
    }
  }
}

try {
  const workspacePath = targetDir
  deleteAllFilesAndFolders(workspacePath);
} catch (error) {
}