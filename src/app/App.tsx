import { useRoutes } from 'react-router-dom';
import Cookies from 'js-cookie';
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  const jsessionId = Cookies.get('JSESSIONID');
  const isLoggednIn = Boolean(jsessionId);

  const routing = useRoutes(routes(isLoggednIn));

  return (
    <QueryClientProvider client={queryClient}>{routing};</QueryClientProvider>
  );
}
