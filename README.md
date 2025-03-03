# TypeSpec Extension Automation

## Description

This project is a vscode plug-in project based on JavaScript. It must be run by vscode. During the plug-in running process, **it must get the focus throughout the process**. Then the plug-in will automatically perform a series of automated operations and generate a log file.

## Prerequisites

- [Nodejs V20](https://nodejs.org/en/download)
- [Visual Code](https://code.visualstudio.com/)

## Quickstart

You need to install a third-party package. If the installation fails, you need to check the network or use another image. Here, `yarn` is used for installation. Please install `yarn` globally first.then Press `F5`.

A new vscode window is automatically opened. The plug-in is installed by default, and the subsequent steps will be performed in the new vscode window.

## Log

The current log is automatically generated. Each time the automation program is run, it will be automatically saved in the local `D:\typespecAutomationLogs`. The format is as follows:

```
====================================================================
ProjectName: createNonBrandedTemplates
StartTime: 2025-03-03 10:20:46
TotalCase: 16
====================================================================

2025-03-03 10:20:46 [INFO] - Start-CreateTypespecProject-Empty Project-Case1
2025-03-03 10:20:46 [INFO] - Description-"The root directory is empty, Add ignore files"
2025-03-03 10:20:46 [INFO] - Creating a new TypeSpec project...
2025-03-03 10:21:40 [INFO] - The generated directories and files are as follows:
2025-03-03 10:21:40 [FILE] - ├─── .gitignore
2025-03-03 10:21:40 [FILE] - ├─── main.tsp
2025-03-03 10:21:40 [FILE] - ├─── node_modules
2025-03-03 10:21:40 [FILE] - ├─── package-lock.json
2025-03-03 10:21:40 [FILE] - ├─── package.json
2025-03-03 10:21:40 [FILE] - └─── tspconfig.yaml
2025-03-03 10:21:40 [SUCCESS] - CreateTypespecProject-Empty Project-Case1: Success

......

====================================================================
SuccessCount: 16
ErrorCount: 0
EndTime: 2025-03-03 10:31:12
TotalTime: 625.265s
====================================================================
```

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.microsoft.com.
