import { instance } from '@/lib/instance';

export async function writeRetrospection(id: number, content: string) {
  return await instance.patch(`/events/${id}/retrospect`, { content });
}
