import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import PrivateLayout from '@/layouts/PrivateLayout';

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    console.log(context, 'Router Context');
    if (!context.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
});

function RouteComponent() {
  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
}
