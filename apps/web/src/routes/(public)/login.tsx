import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginPage } from '@/features/auth';

export const Route = createFileRoute('/(public)/login')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }
  },
});

function RouteComponent() {
  return <LoginPage />;
}
