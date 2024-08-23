import { instance } from '@/lib/instance';
import { CreateSessionFormFields } from '../lib/CreateSessionFormSchema';

export async function createSession(formData: CreateSessionFormFields) {
  const multiPartFormData = new FormData();

  const formattedStartHour = formData.startHour.padStart(2, '0');
  const formattedStartMinute = formData.startMinute.padStart(2, '0');
  const formattedEndHour = formData.endHour.padStart(2, '0');
  const formattedEndMinute = formData.endMinute.padStart(2, '0');

  const blob = new Blob(
    [
      JSON.stringify({
        title: formData.title,
        content: formData.content,
        startAt: `${formData.startDate}T${formattedStartHour}:${formattedStartMinute}`,
        endAt: `${formData.endDate}T${formattedEndHour}:${formattedEndMinute}`,
        location: formData.location,
      }),
    ],
    { type: 'application/json' },
  );

  formData.array.forEach((file) => {
    multiPartFormData.append('images', file);
  });
  multiPartFormData.append('detail', blob);
  const { data } = await instance.post('/events', multiPartFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}
