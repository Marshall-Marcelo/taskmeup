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

type Props = {
  workspaceId: string;
};

const SelectedWorkspacePage = ({ workspaceId }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    data: workspace,
    isPending,
    isError,
    isFetching,
  } = useGetWorkspaceDetails(workspaceId);

  if (isError) return <div>Forbidden</div>;
  if (isPending || isFetching) return <Spinner />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">{workspace.workspaceName}</h1>
        <h2 className="text-xs text-muted-foreground">
          {workspace.workspaceId}
        </h2>
      </div>

      <Tabs defaultValue="tasks">
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
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </CardTitle>
              <CardDescription>Tasks</CardDescription>
            </CardHeader>
            <CardContent>Tasks</CardContent>
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
