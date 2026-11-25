import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryProvider } from '@/lib/query-client';
import { AuthProvider } from '@/features/auth';
import { useAuth } from '@/features/auth';
import { NotFoundPage } from '@/features/auth';
import { Toaster } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
// import { useEffect } from 'react';

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

  // useEffect(() => {
  //   if (!auth.isRefreshingUser) {
  //     void router.invalidate();
  //   }
  // }, [auth.isRefreshingUser, auth.isAuthenticated]);

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
        <RoutedApplication />
        <Toaster duration={2 * 1000} />
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
