import { createFileRoute } from '@tanstack/react-router';
import { DashboardPage } from '@/features/dashboard';

export const Route = createFileRoute('/(app)/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardPage />;
}
