import { instance } from '@/lib/instance';

export interface AttendanceData {
  eventId: number;
  batch: string;
}

// 달 별 출석 정보 가져오기
export const getAttendances = async (year: string, month: string) => {
  console.log(year, month);
  return await instance
    .get(`/attendances?year=${year}&month=${month}`)
    .then((res) => res.data);
};

// post 출석 -> qr url 받아오기
export const postAttendance = async (data: AttendanceData) => {
  try {
    const response = await instance.post(`/attendances`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// delete 출석 이벤트 -> attendanceId 삭제
export const deleteAttendance = async (attendanceId: number) => {
  try {
    const response = await instance.delete(
      `/attendances/${attendanceId}?attendanceId=${attendanceId}`,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

//
export const postAttendanceQR = async (attendanceId: number) => {
  try {
    const response = await instance.post(
      `/attendances/${attendanceId}/qr?attendanceId=${attendanceId}`,
    );
    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// delete QR
export const deleteAttendanceQR = async (attendanceId: number) => {
  try {
    const response = await instance.delete(
      `/attendances/${attendanceId}/qr?attendanceId=${attendanceId}`,
    );
    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
