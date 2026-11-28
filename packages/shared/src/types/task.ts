export type TaskStatus =
  | 'todo'
  | 'ongoing'
  | 'review'
  | 'cancelled'
  | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task_DB {
  task_id: string;
  workspace_id: string;
  task_name: string;
  task_description: string;
  created_by: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Task {
  taskId: string;
  workspaceId: string;
  taskName: string;
  taskDescription: string;
  createdBy: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GroupedTasks {
  priority: TaskPriority;
  tasks: Task[];
}
