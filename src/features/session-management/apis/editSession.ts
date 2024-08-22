import { instance } from '@/lib/instance';
import { EditSessionFormFields } from '../lib/EditSessionFormSchema';

export async function editSession(formData: EditSessionFormFields, id: number) {
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
        eventImageKeysToDelete: formData.eventImageKeysToDelete,
      }),
    ],
    { type: 'application/json' },
  );

  formData.array.forEach((file) => {
    multiPartFormData.append('new-images', file);
  });
  multiPartFormData.append('detail', blob);
  const { data } = await instance.patch(`/events/${id}`, multiPartFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}
