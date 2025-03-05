# DevOpsHelper README

DevOpsHelper is a Visual Studio Code extension designed to streamline the management of Azure DevOps work items. By integrating directly into your VS Code environment, DevOpsHelper offers an efficient way to view, organize, and interact with work items without leaving your editor. This extension provides a hierarchical view of projects, work item types, and individual work items, making it easier to navigate and manage your Azure DevOps tasks. Customizable through VS Code settings, DevOpsHelper requires users to configure a Personal Access Token (PAT) and their Azure DevOps account email to fetch and display relevant work items. Enhance your productivity and simplify your DevOps workflow with DevOpsHelper.

## Features

Display work items categorized by projects and types.

Easy access to work item details including state, tags, and descriptions.

## Requirements

To use DevOpsHelper, you must have an Azure DevOps account and a Personal Access Token (PAT) with appropriate permissions to access work items.

## Extension Settings

DevOpsHelper requires configuration of the following settings via VS Code's settings:

* `devops-helper.PAT`: Your Personal Access Token for Azure DevOps. This token is used to authenticate and authorize your requests. PAT must have Analytics permissions.

* `devops-helper.email`: The email associated with your Azure DevOps account. This is used to filter work items assigned to you.

* `devops-helper.organization`: The name of your Azure DevOps organization

To configure these settings, go to VS Code's Settings (Ctrl+, or Cmd+, on macOS), search for "DevOpsHelper", and fill in your PAT and email accordingly.

## Known Issues


## Release Notes

### 1.0.0

Initial release of DevOpsHelper.

**Enjoy!**
