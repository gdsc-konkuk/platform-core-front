import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {
    console.warn('No AuthProvider found', value);
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/members/check-login`, null, {
        withCredentials: true,
        validateStatus: function(status) {
          return status === 200;
        },
      })
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error('Error fetching login status:', error);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authStore = useContext(AuthContext);

  if (!authStore) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authStore;
}
