// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import *  as vscode from "vscode";
import * as cmd from './commands';
import {WorkItemProvider,WorkItem, WorkItemTreeItem}  from './workItemProvider';

// import { QueryTreeDataProvider, TreeItemEntry } from "./dataProviders/treeDataProviders/QueryTreeDataProvider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let workItemProvider: WorkItemProvider;

export function activate(context: vscode.ExtensionContext) {

	workItemProvider = new WorkItemProvider([]);
	vscode.window.registerTreeDataProvider('devops-helper.workItemList', workItemProvider);

	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let refreshWorkItemListCommand = vscode.commands.registerCommand('devops-helper.refreshWorkItemList', () => cmd.refreshWorkItemList(context,workItemProvider));
	let openWorkItemDetailCommand = vscode.commands.registerCommand('devops-helper.openWorkItemDetail', (workItemTree: WorkItemTreeItem) => cmd.openWorkItemDetail((workItemTree)));;
	// const queryTreeDataProvider: QueryTreeDataProvider = new QueryTreeDataProvider(context);
	
	
	context.subscriptions.push(refreshWorkItemListCommand);
	context.subscriptions.push(openWorkItemDetailCommand)
	
	
	
	// firstTry
	cmd.refreshWorkItemList(context,workItemProvider);





	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "DevOpsHelper" is now active!');


}

// This method is called when your extension is deactivated
export function deactivate() {}
