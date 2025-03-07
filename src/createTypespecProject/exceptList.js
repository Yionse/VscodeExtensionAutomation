const exceptTextErrorList = {
  search: {
    msg: "Failed to open the command palette",
    partName: "Create_Typespec_Project"
  },
  folder: {
    msg: "Failed to select a folder",
    partName: "Create_Typespec_Project"
  },
  template: {
    msg: "Failed to select a template",
    partName: "Create_Typespec_Project"
  }
}

const findKeyByErrorMsg = (targetValue) => {
  return Object.keys(exceptTextErrorList).find(
    (key) => exceptTextErrorList[key].msg === targetValue
  )
}

module.exports = {
  exceptTextErrorList,
  findKeyByErrorMsg
}
