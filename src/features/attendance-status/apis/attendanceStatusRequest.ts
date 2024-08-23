import { instance } from '@/lib/instance';

export const getEvents = async (batch: string, year: string, month: string) => {
  console.log(year, month);
  return await instance
    .get(`/member/${batch}/attendances?year=${year}&month=${month}`)
    .then((res) => res.data);
};
