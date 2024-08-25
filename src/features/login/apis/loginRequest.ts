import axios from 'axios';
import { BASE_URL_VANILLA } from '@/lib/constants';

export async function loginRequest(id: string, password: string) {
  return axios.post(
    `${BASE_URL_VANILLA}/login`,
    {
      id,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    },
  );
}
