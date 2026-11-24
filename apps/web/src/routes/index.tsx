import { createFileRoute } from '@tanstack/react-router';
import { LandingPage } from '@/features/auth';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LandingPage />;
}
