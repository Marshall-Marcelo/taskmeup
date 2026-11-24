import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryProvider } from '@/lib/query-client';
import { AuthProvider } from '@/features/auth';
import { useAuth } from '@/features/auth';
import { NotFoundPage } from '@/features/auth';
import { Toaster } from 'sonner';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface RouterContext {
    user?: string;
    isAuthenticated: string;
  }
}

function RoutedApplication() {
  const auth = useAuth();

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
