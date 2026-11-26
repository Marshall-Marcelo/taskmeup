import { createFileRoute } from '@tanstack/react-router';
import SelectedWorkspacePage from '@/features/workspace/pages/SelectedWorkspacePage';

export const Route = createFileRoute('/(app)/workspace/$workspaceId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { workspaceId } = Route.useParams();

  return <SelectedWorkspacePage workspaceId={workspaceId} />;
}
