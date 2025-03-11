# DevOpsHelper

A Visual Studio Code extension that integrates Azure DevOps work items directly into your editor. Stay on top of your tasks without context switching.

## Features

- **Hierarchical Work Item View**: Browse your assigned work items organized by Project → Work Item Type → Individual Items
- **Work Item Details**: View important information like state and tags directly in the tree view
- **Custom Work Item Icons**: Visual indicators for different work item types (Bug, Task, Feature, Epic, User Story)
- **One-Click Access**: Open any work item in your browser with a single click
- **Auto-Refresh**: Loads your work items when the extension activates
- **Manual Refresh**: Update your work items list on demand

## Requirements

- Visual Studio Code 1.60.0 or higher
- An active Azure DevOps account
- A Personal Access Token (PAT) with Work Item and Analytics permissions

## Installation

1. Install from the Visual Studio Code Marketplace
2. Or download the .vsix file and install manually

## Setup

Before using DevOpsHelper, you need to configure the following settings:

1. Open VS Code settings (File > Preferences > Settings)
2. Search for "DevOps Helper"
3. Fill in the following required fields:
   - **PAT**: Your Azure DevOps Personal Access Token (must have Analytics permissions)
   - **Email**: Your Azure DevOps account email address
   - **Organization**: Your Azure DevOps organization name

```json
{
  "devops-helper.PAT": "your-personal-access-token",
  "devops-helper.email": "your-email@example.com",
  "devops-helper.organization": "your-organization-name"
}
```

## Usage

Once configured:

1. Click the DevOpsHelper icon in the Activity Bar
2. Your assigned work items will load automatically, organized by project and work item type
3. Click on a project to see work item types
4. Click on a work item type to see individual items
5. Click on an individual work item to open it in your browser
6. Use the refresh button to update the work item list

### Available Commands

- **DevOpsHelper: Refresh Work Item List** - Manually refresh your work items

## Work Item Filtering

The extension automatically filters work items to show only:
- Items assigned to your email address
- Non-closed, non-resolved, and non-removed items
- Items that are not of type "Development"

## Customization

DevOpsHelper uses custom icons for different work item types:
- Bug
- Feature
- Task
- Epic
- User Story
- Default (for other types)

## Known Issues

None reported yet. Please submit issues on the GitHub repository.

## Privacy

Your PAT and other credentials are stored in VS Code's secure storage and are only used to authenticate with Azure DevOps.

## Release Notes

### 1.0.0

- Initial release
- Hierarchical view of work items by project and type
- Direct access to work item details
- Custom icons for different work item types

---


## License

This extension is licensed under the MIT License.

**Enjoy!**