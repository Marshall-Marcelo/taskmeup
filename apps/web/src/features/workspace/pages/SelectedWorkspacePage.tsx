import { useGetWorkspaceDetails } from '@/features/workspace/hooks/useWorkspace';
import { Spinner } from '@/components/ui/spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewTaskDialog from '@/features/workspace/components/NewTaskDialog';
import { useState } from 'react';
import { useGetWorkspaceTasks } from '@/features/task/hooks/useTask';
import { TaskDisplay } from '@/features/task';

type Props = {
  workspaceId: string;
};

const SelectedWorkspacePage = ({ workspaceId }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const {
    data: workspace,
    isPending: isFetchingWorkspaceDetails,
    isError,
    isFetching,
  } = useGetWorkspaceDetails(workspaceId);

  const { data: tasks, isPending: isFetchingTasks } = useGetWorkspaceTasks(
    workspaceId,
    activeTab,
  );

  if (isError) return <div>Forbidden</div>;
  if (isFetchingWorkspaceDetails || isFetching) return <Spinner />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">{workspace.workspaceName}</h1>
        <h2 className="text-xs text-muted-foreground">
          {workspace.workspaceId}
        </h2>
      </div>

      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Overview</CardDescription>
            </CardHeader>
            <CardContent>Overview</CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="flex flex-col gap-2 items-start" value="tasks">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between">
                <span>Tasks</span>
                <NewTaskDialog
                  currentTab={activeTab}
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {isFetchingTasks ? (
                <Spinner />
              ) : (
                tasks?.map(({ priority, tasks }) => (
                  <>
                    {priority === 'high' && (
                      <div className="flex flex-col gap-1">
                        <h3 className="border-b-2 border-red-500 font-bold">
                          High Priority
                        </h3>
                        {tasks.length !== 0 ? (
                          tasks.map((task) => (
                            <TaskDisplay
                              key={task.taskId}
                              taskId={task.taskId}
                              workspaceId={task.workspaceId}
                              taskName={task.taskName}
                              taskDescription={task.taskDescription}
                              createdBy={task.createdBy}
                              status={task.status}
                              priority={task.priority}
                              dueDate={task.dueDate}
                              createdAt={task.createdAt}
                              updatedAt={task.updatedAt}
                            />
                          ))
                        ) : (
                          <>No tasks</>
                        )}
                      </div>
                    )}
                    {priority === 'medium' && (
                      <div className="flex flex-col">
                        <h3 className="border-b-2 border-yellow-500">
                          Medium Priority
                        </h3>
                        {tasks.length !== 0 ? (
                          tasks.map((task) => (
                            <TaskDisplay
                              key={task.taskId}
                              taskId={task.taskId}
                              workspaceId={task.workspaceId}
                              taskName={task.taskName}
                              taskDescription={task.taskDescription}
                              createdBy={task.createdBy}
                              status={task.status}
                              priority={task.priority}
                              dueDate={task.dueDate}
                              createdAt={task.createdAt}
                              updatedAt={task.updatedAt}
                            />
                          ))
                        ) : (
                          <>No tasks</>
                        )}
                      </div>
                    )}
                    {priority === 'low' && (
                      <div className="flex flex-col gap-1">
                        <h3 className="border-b-2 border-green-500">
                          Low Priority
                        </h3>
                        {tasks.length !== 0 ? (
                          tasks.map((task) => (
                            <TaskDisplay
                              key={task.taskId}
                              taskId={task.taskId}
                              workspaceId={task.workspaceId}
                              taskName={task.taskName}
                              taskDescription={task.taskDescription}
                              createdBy={task.createdBy}
                              status={task.status}
                              priority={task.priority}
                              dueDate={task.dueDate}
                              createdAt={task.createdAt}
                              updatedAt={task.updatedAt}
                            />
                          ))
                        ) : (
                          <>No tasks</>
                        )}
                      </div>
                    )}
                  </>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
              <CardDescription>Members</CardDescription>
            </CardHeader>
            <CardContent>Members</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Settings</CardDescription>
            </CardHeader>
            <CardContent>Settings</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SelectedWorkspacePage;
