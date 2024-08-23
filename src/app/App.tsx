import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '@/stores/AuthProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function App() {
  const { isLoggedIn } = useAuth();

  const routing = useRoutes(routes(isLoggedIn));

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      {routing}
    </QueryClientProvider>
  );
}
