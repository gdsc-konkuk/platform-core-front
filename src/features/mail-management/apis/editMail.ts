import { instance } from '@/lib/instance';
import { CreateMailFormFields } from '../lib/CreateMailFormSchema';

export async function editMail(formData: CreateMailFormFields, id: number) {
  return await instance.patch(`/emails/${id}`, {
    subject: formData.subject,
    content: formData.content,
    receiverInfos: formData.recieverInfos,
    sendAt: `${formData.date}T${formData.hour.padStart(2, '0')}:${formData.minute.padStart(2, '0')}`,
  });
}
