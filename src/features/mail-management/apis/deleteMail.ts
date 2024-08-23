import { instance } from '@/lib/instance';

export function deleteMail(id: number) {
  return instance.delete(`/emails/${id}`);
}
