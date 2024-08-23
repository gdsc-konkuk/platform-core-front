import React, { useState } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import checkboxEmptyIcon from '/icons/checkbox-empty.svg';

import checkboxFullIcon from '/icons/checkbox-full.svg';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from './apis/attendanceStatusRequest';

dayjs.extend(localeData);

interface AttendanceInfo {
  attendanceId: number;
  eventId: number;
  memberId: number;
  attendanceDate: string;
  participantId: number;
  attended: boolean;
}

interface Member {
  actualAttendances: number;
  attendanceInfoList: AttendanceInfo[];
  department: string | null; // department는 null일 수 있음
  memberId: number;
  memberName: string;
  memberRole: string; // 예: "MEMBER"
  totalAttendances: number;
}

type ResponseData = {
  message: string;
  data: Member[];
  success: boolean;
};

export default function AttendanceStatus() {
  const [isEditing, setIsEditing] = useState(false);

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(currentDate.year());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month());

  const params = {
    batch: '24-25',
    year: selectedYear.toString(),
    month: (selectedMonth + 1).toString(),
  };

  const {
    data: recordsData,
    error,
    isLoading,
  } = useQuery<ResponseData>({
    queryKey: ['eventStatus', selectedYear, selectedMonth],
    queryFn: () => getEvents(params),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>Error: {(error as Error).message}</div>;
  }

  const handleYearChange = (value: string) => {
    const newYear = Number(value);
    setSelectedYear(newYear);
    setCurrentDate(currentDate.year(newYear));
  };

  const handleMonthChange = (value: string) => {
    const newMonth = Number(value);
    setSelectedMonth(newMonth);
    setCurrentDate(currentDate.month(newMonth));
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col items-start">
            <h1 className="mb-[2vh] font-['NanumSquareRoundEB'] text-[24px] font-extrabold">
              출석 현황
            </h1>
            <div className="p-4 border w-[70vw] h-[85vh] rounded-[20px]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex justify-start items-center mb-4">
                  <Select onValueChange={handleYearChange}>
                    <SelectTrigger className="w-[110px] mr-2 text-[#171719] font-[Pretendard] text-[22px] font-[600]">
                      <SelectValue placeholder={selectedYear} />
                    </SelectTrigger>
                    <SelectContent className="text-[#171719] font-[Pretendard] text-[22px] font-[600]">
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={(dayjs().year() - 5 + i).toString()}
                        >
                          {dayjs().year() - 5 + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={handleMonthChange}>
                    <SelectTrigger className="w-[80px] mr-2 text-[#171719] font-[Pretendard] text-[22px] font-[600]">
                      <SelectValue placeholder={selectedMonth + 1} />
                    </SelectTrigger>
                    <SelectContent className="mr-2 text-[#171719] font-[Pretendard] text-[22px] font-[600]">
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4">
                  {isEditing ? (
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-white text-[#0DAA5C] font-[500] px-[20px] py-[9px] border border-[#0DAA5C] rounded-[8px]"
                    >
                      저장
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-white text-[#171719] font-[500] px-[20px] py-[9px] border border-[var(--grey-6,#BEBEBF)] rounded-[8px]"
                    >
                      수정
                    </button>
                  )}
                  <button
                    disabled
                    className="bg-white text-[#BEBEBF] font-[500] px-[20px] py-[9px] border border-[var(--grey-6,#BEBEBF)] rounded-[8px]"
                  >
                    Export
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto h-[70vh]">
                <table className="w-full table-auto">
                  <thead className="sticky top-0 z-10 bg-white">
                    <tr className="text-left">
                      <th className="px-4 py-2">이름</th>
                      <th className="px-4 py-2">학과</th>
                      <th className="px-4 py-2">결과</th>
                      <th className="px-4 py-2">역할</th>
                      {recordsData?.data[0]?.attendanceInfoList?.map(
                        (attendanceInfo) => (
                          <th
                            key={attendanceInfo.attendanceDate}
                            className="px-4 py-2"
                          >
                            {attendanceInfo.attendanceDate.substring(8, 10)}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>

                  <tbody className=" border-t">
                    {recordsData?.data?.map((record, index) => (
                      <tr
                        key={index}
                        className="text-[#333335] font-pretendard text-base font-semibold"
                      >
                        <td className="px-4 py-2">{record.memberName}</td>
                        <td className="px-4 py-2">{record.department}</td>
                        <td className="px-4 py-2">{`${record.actualAttendances}/${record.totalAttendances}`}</td>
                        <td className="px-4 py-2">{record.memberRole}</td>
                        {record?.attendanceInfoList?.map(
                          (attendanceInfo, listIndex) => (
                            <td
                              key={attendanceInfo.attendanceId}
                              className="px-4 py-2 text-center"
                            >
                              {/* 수정상태일 때 */}
                              <div className="flex ">
                                {isEditing ? (
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`check+${index}${listIndex}`}
                                      className="w-[20px] h-[20px] hidden"
                                      checked={attendanceInfo.attended}
                                    />

                                    <label
                                      htmlFor={`check+${index}${listIndex}`}
                                      className="block"
                                    >
                                      {attendanceInfo.attended ? (
                                        <img
                                          src={checkboxFullIcon}
                                          alt="checkboxFullIcon"
                                        />
                                      ) : (
                                        <img
                                          src={checkboxEmptyIcon}
                                          alt="checkboxEmptyIcon"
                                        />
                                      )}
                                    </label>
                                  </div>
                                ) : attendanceInfo.attended ? (
                                  <p className="ml-[4px]">o</p>
                                ) : (
                                  <p className="ml-[4px]">x</p>
                                )}
                              </div>
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
