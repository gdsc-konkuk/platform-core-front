import { instance } from '@/lib/instance';

export async function deleteSession(id: number) {
  return await instance.delete(`/events/${id}`);
}
