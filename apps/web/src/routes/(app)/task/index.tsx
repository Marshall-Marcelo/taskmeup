import { createFileRoute } from '@tanstack/react-router';
import { TaskPage } from '@/features/task';

export const Route = createFileRoute('/(app)/task/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskPage />;
}
