import { instance } from '@/lib/instance';

//디폴트 food data
export const getAttendances = async (year: string, month: string) => {
  console.log(year, month);
  return await instance
    .get(`/attendances?year=${year}&month=${month}`)
    .then((res) => res.data);
};

export const postAttendanceQR = async (attendanceId: number) => {
  return await instance
    .post(`/attendances/${attendanceId}/qr?attendanceId=${attendanceId}`)
    .then((res) => res.data);
};
