import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryProvider } from '@/lib/query-client';
import { AuthProvider } from '@/features/auth';
import { useAuth } from '@/features/auth';
import { NotFoundPage } from '@/features/auth';
import { Toaster } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { SocketProvider } from '@/lib/socket-provider';
import { WorkspaceProvider } from '@/context/workspace-context';

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
  context: { user: undefined, isAuthenticated: false },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function RoutedApplication() {
  const auth = useAuth();

  if (auth.isRefreshingUser) {
    return <Spinner />;
  }

  return (
    <RouterProvider
      router={router}
      context={{ user: auth.user, isAuthenticated: auth.isAuthenticated }}
    />
  );
}

const App = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <SocketProvider>
            <RoutedApplication />
            <Toaster duration={2 * 1000} />
          </SocketProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
