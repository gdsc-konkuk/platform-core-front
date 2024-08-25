import { instance } from '@/lib/instance';

export async function getMail(id: number) {
  const { data } = await instance.get(`/emails/${id}`);

  return data;
}
