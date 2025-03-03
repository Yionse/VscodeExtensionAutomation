const {
  triggerCreateProject,
  selectTemplate,
  typingName,
  specialStepsAzure
} = require("./operations")
const { configArrayList, templateList } = require("./config")
const { deleteFile } = require("../common/deleteFile")
const { setFileName, log } = require("../common/log")
const { createTypespecResult } = require("./result")
const { outputChannelSys } = require("../common/message")
const moment = require("moment")

async function createTemplatesOperation({
  name,
  config,
  description,
  template
}) {
  try {
    await triggerCreateProject({
      name,
      description,
      isEmptyFolder: config.emptyFolder
    })

    await selectTemplate({ template, isEmptyFolder: config.emptyFolder })

    await typingName(config.addGitignore)

    await specialStepsAzure(template)

    await createTypespecResult({
      name,
      template,
      isAddGitignore: config.addGitignore
    })
    return true
  } catch (error) {
    outputChannelSys({
      type: "error",
      msg: error.message
    })
    outputChannelSys({
      type: "error",
      msg: `${name}: Failed\n`
    })
    return false
  } finally {
    deleteFile()
  }
}

/**
 * Create multiple TypeSpec projects in batch
 * configArrayList - The array of configuration objects for each project to be created.
 * {
 *    name: Project name,
 *    config: {
 *       emptyFolder: true | false,
 *       notEmptyFolderContinue: true,  // Can only be true. If false, the project will not be created.
 *       addGitignore: true | false,
 *    },
 *    description: "Project description"
 * }
 */
async function createTemplates(name) {
  // Check the environment start
  // await sleep(3)
  // if (!preCheck()) {
  //   createTypespecResult()
  //   return
  // }
  // await sleep(3)
  // Check the environment end
  const startTime = +new Date()
  let successCount = 0
  let errorCount = 0
  const fileName = `log-create${name}Templates-${+new Date()}.txt`
  setFileName(fileName)
  log(
    `====================================================================\nProjectName: create${name}Templates\nStartTime: ${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}\nTotalCase: ${
      configArrayList.length *
      templateList.filter((item) => item.type === name)?.length
    }\n====================================================================\n\n`,
    "sys"
  )

  for (const template of templateList
    .filter((item) => item.type === name)
    ?.map((item) => item.templateName)) {
    for (const [index, config] of configArrayList.entries()) {
      const isSuccess = await createTemplatesOperation({
        ...config,
        name: `${config.name}-${template}-Case${index + 1}`,
        template
      })
      if (isSuccess) {
        successCount++
      } else {
        errorCount++
      }
    }
  }

  log(
    `====================================================================\nSuccessCount: ${successCount}\nErrorCount: ${errorCount}\nEndTime: ${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}\nTotalTime: ${
      (+new Date() - startTime) / 1000
    }s\n====================================================================`,
    "sys"
  )
}

module.exports = {
  createTemplates
}
