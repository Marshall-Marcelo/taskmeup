import { ApiService } from '@/lib/api';
import type {
  NewWorkspaceResponse,
  Workspace,
  WorkspaceList,
} from '@taskmeup/shared';

class WorkspaceService extends ApiService {
  async createNewWorkspace(
    workspaceName: string,
  ): Promise<NewWorkspaceResponse> {
    const data: NewWorkspaceResponse = await this.handleFetch(
      `/workspace/new`,
      {
        method: 'POST',
        body: JSON.stringify({ workspaceName }),
      },
    );

    return data;
  }

  async getWorkspaceDetails(workspaceId: string): Promise<Workspace> {
    const data: Workspace = await this.handleFetch(
      `/workspace/${workspaceId}`,
      {
        method: 'GET',
      },
    );

    return data;
  }

  async getWorkspaces(): Promise<WorkspaceList[]> {
    const data: WorkspaceList[] = await this.handleFetch(`/workspace/list`, {
      method: 'GET',
    });

    return data;
  }
}

export const workspaceService = new WorkspaceService();
