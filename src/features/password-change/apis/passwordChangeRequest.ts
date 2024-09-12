import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

export async function passwordChangeRequest(id: string, password: string) {
  return axios.post(
    `${BASE_URL}/${id}/password`,
    {
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );
}
