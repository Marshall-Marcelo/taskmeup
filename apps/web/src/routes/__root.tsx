import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import AppLayout from '@/layouts/AppLayout';
import type { RouterContext } from '@/context/router-context';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
