import type { Task } from '@taskmeup/shared';
import { cn } from 'cn';
import { ChevronRight } from 'lucide-react';
import { formatDeadline } from '@/lib/date';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

export interface TaskDisplayProps extends Task {
  className?: string;
}

const TaskDisplay = ({
  taskId,
  workspaceId,
  taskName,
  taskDescription,
  createdBy,
  status,
  priority,
  dueDate,
  createdAt,
  updatedAt,
  className,
}: TaskDisplayProps) => {
  return (
    <div className="flex flex-row justify-between items-center rounded-md shadow p-2">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{taskName}</span>
        <span>{formatDeadline(dueDate)}</span>
      </div>
      <TaskInformationDialog
        taskId={taskId}
        workspaceId={workspaceId}
        taskName={taskName}
        taskDescription={taskDescription}
        createdBy={createdBy}
        status={status}
        priority={priority}
        dueDate={dueDate}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    </div>
  );
};

const TaskInformationDialog = ({
  taskId,
  workspaceId,
  taskName,
  taskDescription,
  createdBy,
  status,
  priority,
  dueDate,
  createdAt,
  updatedAt,
  className,
}: TaskDisplayProps) => {
  return (
    <Dialog>
      <DialogTrigger
        nativeButton={false}
        render={<ChevronRight />}
      ></DialogTrigger>
      <DialogContent className={'gap-2'}>
        <DialogHeader className="text-lg font-semibold">
          {taskName}
        </DialogHeader>
        <div className="flex flex-col">
          <span>{taskDescription}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDisplay;
