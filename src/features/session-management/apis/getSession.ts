import { instance } from '@/lib/instance';

export async function getSession(id: number) {
  const { data } = await instance.get(`/events/${id}`);

  return data.data;
}
