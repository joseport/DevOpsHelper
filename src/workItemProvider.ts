import path = require('path');
import * as vscode from 'vscode';

export interface WorkItem {
    Organization: string;
    WorkItemId: number;
    Title: string;
    WorkItemType: string;
    State: string;
    TagNames: string | null;
    Project: {
        ProjectName: string;
    };
}

class ProjectTreeItem extends vscode.TreeItem {
    constructor(public readonly projectName: string) {
        super(projectName, vscode.TreeItemCollapsibleState.Collapsed);
    }
    contextValue = 'project';
}

class WorkItemTypeTreeItem extends vscode.TreeItem {
    constructor(public readonly workItemType: string, public readonly projectName: string) {
        super(workItemType, vscode.TreeItemCollapsibleState.Collapsed);
        const iconName = this.getIconNameForWorkItemType(workItemType);
        this.iconPath = {
            light: vscode.Uri.file(path.join(__dirname, '..', 'media', 'light', `${iconName}.svg`)),
            dark: vscode.Uri.file(path.join(__dirname, '..', 'media', 'dark', `${iconName}.svg`))
        };
    }
    contextValue = 'workItemType';
    
    private getIconNameForWorkItemType(workItemType: string): string {
        // Retorna un nombre de archivo de ícono basado en el workItemType
        switch (workItemType) {
            case 'Bug':
                return 'bug';
            case 'Feature':
                return 'feature';
            case 'Task':
                return 'task';
            case 'Epic':
                return  'epic';
            case  'User Story':
                return 'user-story';
            default:
                return 'default';
        }
    }
}


export class WorkItemTreeItem extends vscode.TreeItem {
    constructor(public readonly workItem: WorkItem) {
        super(workItem.Title, vscode.TreeItemCollapsibleState.None);
        this.id = workItem.WorkItemId.toString();
        this.tooltip = `${workItem.WorkItemType}: ${workItem.State}`;
        this.description = workItem.TagNames?.toString();

    }
    contextValue = 'workItem';
}

export class WorkItemProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null> = new vscode.EventEmitter<vscode.TreeItem | undefined | null>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null> = this._onDidChangeTreeData.event;

    private workItems: WorkItem[] = [];
    

    constructor(workItems: WorkItem[]) {
        this.workItems = workItems;
    }

    refreshWorkItems(workItems: WorkItem[]) {
        this.workItems = workItems;
        this._onDidChangeTreeData.fire(undefined);
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
        if (!element) {
            // Raíz del árbol: devolver proyectos
            const projects = [...new Set(this.workItems.map(item => item.Project.ProjectName))].sort();
            return Promise.resolve(projects.map(projectName => new ProjectTreeItem(projectName)));
        } else if (element instanceof ProjectTreeItem) {
            // Nivel de proyecto: devolver WorkItemTypes
            const workItemTypes = [...new Set(this.workItems.filter(item => item.Project.ProjectName === element.projectName).map(item => item.WorkItemType))].sort();
            return Promise.resolve(workItemTypes.map(type => new WorkItemTypeTreeItem(type, element.projectName)));
        } else if (element instanceof WorkItemTypeTreeItem) {
            // Nivel de WorkItemType: devolver WorkItems
            const workItems = this.workItems.filter(item => item.WorkItemType === element.workItemType && item.Project.ProjectName === element.projectName);
            return Promise.resolve(workItems.map(workItem => new WorkItemTreeItem(workItem)));
        } else {
            return Promise.resolve([]);
        }
    }
}




// export class WorkItemProvider implements vscode.TreeDataProvider<WorkItemTreeItem> {
//     private _onDidChangeTreeData: vscode.EventEmitter<WorkItemTreeItem | undefined | null | void> = new vscode.EventEmitter<WorkItemTreeItem | undefined | null | void>();
//     readonly onDidChangeTreeData: vscode.Event<WorkItemTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
    
//     private workItems: WorkItem[] = [];
    
//     constructor(workItems: WorkItem[]) {
//         this.workItems = workItems;
//     }

//     refreshWorkItems(workItems: WorkItem[]){
//         this.workItems = workItems;
//         this._onDidChangeTreeData.fire();
//     }

//     getTreeItem(element: WorkItemTreeItem): vscode.TreeItem {
//         return element;
//     }

//     getChildren(element?: WorkItemTreeItem): Thenable<WorkItemTreeItem[]> {
//         if (element) {
//             return Promise.resolve([]);
//         } else {
//             return Promise.resolve(this.workItems.map(workItem => new WorkItemTreeItem(workItem)));
//         }
//     }
// }
