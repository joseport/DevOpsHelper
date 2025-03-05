import * as vscode from 'vscode';
import axios from 'axios';
import {WorkItemProvider, WorkItem,WorkItemTreeItem}  from './workItemProvider';

export async function refreshWorkItemList(context: vscode.ExtensionContext,workItemProvider: WorkItemProvider) {
  try {
    const { pat, organization, email } = getSetup();
    const workItems =  await getWorkItems(pat,organization,email);
    workItemProvider.refreshWorkItems(workItems);
    console.log('Success')
  } catch (error) {
    console.error(error);
    vscode.window.showErrorMessage('Failed to refresh work item list');
  }
}

export async function getWorkItems(pat:string, organization:string, email:string): Promise<WorkItem[]>{
  const authHeader = `Basic ${Buffer.from(`:${pat}`).toString('base64')}`;
  const url = `https://analytics.dev.azure.com/${organization}/_odata/v1.0/WorkItems?$select=WorkItemId,WorkItemType,Title,State,TagNames&$expand=Project($select=ProjectName)&$filter=(AssignedTo/UserEmail eq '${email}' AND WorkItemType ne 'Development' AND state ne 'Closed' AND state ne 'Removed' AND state ne 'Resolved')&$orderby=Project/ProjectName asc,WorkItemType asc,WorkItemId`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': authHeader
      }
    });

    const workItems: WorkItem[] = response.data.value.map((item: any) => ({
      Organization: organization,
      WorkItemId: item.WorkItemId,
      Title: item.Title,
      WorkItemType: item.WorkItemType,
      State: item.State,
      TagNames: item.TagNames,
      Project: {
        ProjectName: item.Project.ProjectName
      }
    }));

    return workItems;

  } catch (error) {
    console.error(error);
    vscode.window.showErrorMessage('Failed to refresh work item list');
    return []
  }

}

function getSetup() {
  const config = vscode.workspace.getConfiguration('devops-helper');
  const pat = config.get('PAT') as string;
  const email = config.get('email') as string;
  const organization = config.get('organization') as string;

  if (!pat || !email || !organization) {
    throw new Error("Missing configuration values");
  }
  return { pat, organization, email };
}

export async function openWorkItemDetail(workItemTree: WorkItemTreeItem) {
  vscode.env.openExternal(vscode.Uri.parse(`https://dev.azure.com/${workItemTree.workItem.Organization}/${workItemTree.workItem.Project.ProjectName}/_workitems/edit/${workItemTree.workItem.WorkItemId}`));
}