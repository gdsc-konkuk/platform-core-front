import axios from 'axios';

export async function loginRequest(id: string, password: string) {
  return axios.post(
    'http://3.86.202.162/login',
    {
      id,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}
