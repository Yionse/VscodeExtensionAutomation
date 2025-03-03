const exceptTextErrorList = {
  search: "Failed to open the command palette",
  folder: "Failed to select a folder",
  template: "Failed to select a template"
}

const findKeyByErrorMsg = (targetValue) => {
  return Object.keys(exceptTextErrorList).find(
    (key) => exceptTextErrorList[key] === targetValue
  )
}

module.exports = {
  exceptTextErrorList,
  findKeyByErrorMsg
}
