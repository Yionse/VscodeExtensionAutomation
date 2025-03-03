const templateList = [
  {
    type: "NonBranded",
    templateName: "Empty Project",
    resultList: ["main.tsp", "package.json", "tspconfig.yaml"]
  },
  {
    type: "NonBranded",
    templateName: "Generic REST API",
    resultList: ["main.tsp", "package.json", "tspconfig.yaml"]
  },
  {
    type: "NonBranded",
    templateName: "TypeSpec Library",
    resultList: [
      "lib",
      "src",
      "test",
      "eslint.config.js",
      "package.json",
      "prettierrc.yaml",
      "tsconfig.json"
    ]
  },
  {
    type: "NonBranded",
    templateName: "TypeSpec Emitter",
    resultList: [
      "src",
      "test",
      "eslint.config.js",
      "package.json",
      "prettierrc.yaml",
      "tsconfig.json"
    ]
  },
  {
    type: "AzurePlan",
    templateName: "(rest-api-spec repo) Azure Data Plane Service Project",
    resultList: ["examples", "client.tsp", "main.tsp", "tspconfig.yaml"]
  },
  {
    type: "AzurePlan",
    templateName: "(rest-api-spec repo) Azure Resource Manager Service Project",
    resultList: ["examples", "employee.tsp", "main.tsp", "tspconfig.yaml"]
  },
  {
    type: "AzurePlan",
    templateName: "(stand alone) Azure Data Plane Service Project",
    resultList: [
      "example",
      "client.tsp",
      "main.tsp",
      "package.json",
      "tspconfig.yaml"
    ]
  },
  {
    type: "AzurePlan",
    templateName: "(stand alone) Azure Resource Manager Service Project",
    resultList: [
      "examples",
      "employee.tsp",
      "main.tsp",
      "tspconfig.yaml",
      "package.json"
    ]
  }
]
const configArrayList = [
  {
    name: "CreateTypespecProject",
    config: {
      emptyFolder: true,
      addGitignore: true
    },
    description: "The root directory is empty, add ignore files"
  },
  {
    name: "CreateTypespecProject",
    config: {
      emptyFolder: false,
      addGitignore: false
    },
    description: "The root directory is not empty, do not add ignore files"
  },
  {
    name: "CreateTypespecProject",
    config: {
      emptyFolder: false,
      addGitignore: true
    },
    description: "The root directory is not empty, add ignore files"
  },
  {
    name: "CreateTypespecProject",
    config: {
      emptyFolder: true,
      addGitignore: false
    },
    description: "The root directory is empty, do not add ignore files"
  }
]

module.exports = {
  templateList,
  configArrayList
}
