import { instance } from '@/lib/instance';

export async function getSessions() {
  const { data } = await instance.get('/events');

  return data;
}
