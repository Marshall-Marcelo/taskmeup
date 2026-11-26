import React from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { RouterContext } from '@/context/router-context';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
