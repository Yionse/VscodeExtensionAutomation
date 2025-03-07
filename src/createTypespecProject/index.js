const {
  triggerCreateProject,
  selectTemplate,
  typingName,
  specialStepsAzure
} = require("./operations")
const { configArrayList, templateList } = require("./config")
const { deleteFile } = require("../common/deleteFile")
const { logger } = require("../common/log")
const { createTypespecResult } = require("./result")
const moment = require("moment")

async function createTemplatesOperation({
  name,
  config,
  description,
  template
}) {
  deleteFile()

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
    logger.setStatus(true)
  } catch (error) {
    logger.log({
      type: "error",
      msg: error.message
    })
    logger.log({
      type: "error",
      msg: `${name}: Failed\n`
    })
    logger.setStatus(false)
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
 *       addGitignore: true | false,
 *    },
 *    description: "Project description"
 * }
 */
async function createTemplates(name = "") {
  // Check the environment start
  // await sleep(3)
  // if (!preCheck()) {
  //   createTypespecResult()
  //   return
  // }
  // await sleep(3)
  // Check the environment end
  const startTime = +new Date()
  logger.setFileName(`CreateTypespecProject${name}-${startTime}.txt`)
  logger.setStartTime(moment().format("YYYY-MM-DD HH:mm:ss"))
  for (const template of templateList
    .filter((item) => (name ? item.type === name : true))
    ?.map((item) => item.templateName)) {
    for (const [_, config] of configArrayList.entries()) {
      logger.setCase(`Case${+new Date()}`)
      await createTemplatesOperation({
        ...config,
        name: `CreateTypespecProject-${template}-${config.caseName}`,
        template
      })
    }
  }
  logger.writeLog()
}

module.exports = {
  createTemplates
}
