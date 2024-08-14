import axios from 'axios';

export async function loginRequest(id: string, password: string) {
  return axios.post(
    'http://localhost:8080/login',
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
