import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryProvider } from '@/lib/query-client';
import { AuthProvider } from '@/features/auth';
import { useAuth } from '@/features/auth';

const router = createRouter({ routeTree });

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
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
