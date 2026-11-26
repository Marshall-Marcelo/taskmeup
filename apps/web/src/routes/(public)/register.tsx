import { createFileRoute, redirect } from '@tanstack/react-router';
import { RegisterPage } from '@/features/auth';

export const Route = createFileRoute('/(public)/register')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }
  },
});

function RouteComponent() {
  return <RegisterPage />;
}
