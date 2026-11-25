import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import PublicLayout from '@/layouts/PublicLayout';
import type { RouterContext } from '@/context/router-context';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}
