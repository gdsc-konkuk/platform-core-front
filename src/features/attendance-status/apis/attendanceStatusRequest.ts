import { instance } from '@/lib/instance';

export interface AttendanceData {
  batch: string;
  year: string;
  month: string;
}

export const getEvents = async (params: AttendanceData) => {
  try {
    const response = await instance.get(
      `/members/${params.batch}/attendances`,
      {
        params,
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};
