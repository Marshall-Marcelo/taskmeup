import { createFileRoute } from '@tanstack/react-router';
import { MessagePage } from '@/features/messaging';

export const Route = createFileRoute('/(app)/messages/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <MessagePage />;
}
