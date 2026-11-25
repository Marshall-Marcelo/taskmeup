import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/features/auth';
import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
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
