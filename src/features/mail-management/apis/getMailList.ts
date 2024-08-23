import { instance } from '@/lib/instance';

export async function getMailList() {
  const { data } = await instance.get('/emails');

  return data;
}
