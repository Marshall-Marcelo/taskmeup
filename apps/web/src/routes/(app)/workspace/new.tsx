import { createFileRoute } from '@tanstack/react-router';
import { NewWorkspacePage } from '@/features/workspace';

export const Route = createFileRoute('/(app)/workspace/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewWorkspacePage />;
}
