import { ApiService } from '@/lib/api';
import type { MessageResponse, NewTask, GroupedTasks } from '@taskmeup/shared';

class TaskService extends ApiService {
  async createNewTask(newTask: NewTask): Promise<MessageResponse> {
    const data: MessageResponse = await this.handleFetch(`/task/new`, {
      method: 'POST',
      body: JSON.stringify({
        workspaceId: newTask.workspaceId,
        taskName: newTask.taskName,
        taskDescription: newTask.taskDescription,
        status: newTask.status,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
      }),
    });

    return data;
  }

  async getWorkspaceTasks(workspaceId: string): Promise<GroupedTasks[]> {
    const data: GroupedTasks[] = await this.handleFetch(
      `/task/${workspaceId}/tasks`,
      {
        method: 'GET',
      },
    );
    return data;
  }
}

export const taskService = new TaskService();
