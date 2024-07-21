import { useRoutes } from 'react-router-dom';
import routes from './routes';

export default function App() {
  const isLoggednIn = true;

  const routing = useRoutes(routes(isLoggednIn));

  return <>{routing}</>;
}
