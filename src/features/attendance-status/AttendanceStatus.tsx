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

dayjs.extend(localeData);

interface AttendanceInfo {
  attendanceId: number;
  eventId: number;
  memberId: number;
  participantId: number;
  attendanceDate: string;
  attendance: boolean;
}

interface Member {
  memberId: number;
  memberName: string;
  memberRole: string;
  profileImageUrl: string | null;
  department: string;
  attendanceInfoList: AttendanceInfo[];
}

const testMember: Member[] = [
  {
    memberId: 0,
    memberName: '홍길동',
    memberRole: 'MEMBER',
    profileImageUrl: null,
    department: '컴퓨터공학과',
    attendanceInfoList: [
      {
        attendanceId: 1,
        eventId: 1,
        memberId: 0,
        participantId: 1,
        attendanceDate: '2024-07-03T00:00:00',
        attendance: true,
      },
      {
        attendanceId: 2,
        eventId: 2,
        memberId: 0,
        participantId: 2,
        attendanceDate: '2024-07-05T00:00:00',
        attendance: false,
      },
      {
        attendanceId: 3,
        eventId: 3,
        memberId: 0,
        participantId: 3,
        attendanceDate: '2024-07-08T00:00:00',
        attendance: true,
      },
    ],
  },
  {
    memberId: 1,
    memberName: '전우치',
    memberRole: 'MEMBER',
    profileImageUrl: null,
    department: '기술경영학과',
    attendanceInfoList: [
      {
        attendanceId: 1,
        eventId: 1,
        memberId: 1,
        participantId: 4,
        attendanceDate: '2024-07-03T00:00:00',
        attendance: true,
      },
      {
        attendanceId: 2,
        eventId: 2,
        memberId: 1,
        participantId: 5,
        attendanceDate: '2024-07-05T00:00:00',
        attendance: false,
      },
      {
        attendanceId: 3,
        eventId: 3,
        memberId: 1,
        participantId: 6,
        attendanceDate: '2024-07-08T00:00:00',
        attendance: false,
      },
    ],
  },
  {
    memberId: 2,
    memberName: '이순신',
    memberRole: 'MEMBER',
    profileImageUrl: null,
    department: '컴퓨터공학과',
    attendanceInfoList: [
      {
        attendanceId: 1,
        eventId: 1,
        memberId: 2,
        participantId: 7,
        attendanceDate: '2024-07-03T00:00:00',
        attendance: true,
      },
      {
        attendanceId: 2,
        eventId: 2,
        memberId: 2,
        participantId: 8,
        attendanceDate: '2024-07-05T00:00:00',
        attendance: false,
      },
      {
        attendanceId: 3,
        eventId: 3,
        memberId: 2,
        participantId: 9,
        attendanceDate: '2024-07-08T00:00:00',
        attendance: true,
      },
    ],
  },
  {
    memberId: 0,
    memberName: '홍길동',
    memberRole: 'MEMBER',
    profileImageUrl: null,
    department: '컴퓨터공학과',
    attendanceInfoList: [
      {
        attendanceId: 1,
        eventId: 1,
        memberId: 0,
        participantId: 1,
        attendanceDate: '2024-07-03T00:00:00',
        attendance: true,
      },
      {
        attendanceId: 2,
        eventId: 2,
        memberId: 0,
        participantId: 2,
        attendanceDate: '2024-07-05T00:00:00',
        attendance: false,
      },
      {
        attendanceId: 3,
        eventId: 3,
        memberId: 0,
        participantId: 3,
        attendanceDate: '2024-07-08T00:00:00',
        attendance: true,
      },
    ],
  },
];

const AttendanceStatus: React.FC = () => {
  const [records, setRecords] = useState<Member[]>(testMember);
  const [isEditing, setIsEditing] = useState(false);

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(currentDate.year());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month());

  const handleAttendanceChange = (index: number, listIndex: number) => {
    const newRecords = [...records];
    newRecords[index].attendanceInfoList[listIndex].attendance =
      !newRecords[index].attendanceInfoList[listIndex].attendance;
    setRecords(newRecords);
  };

  const getTotalAttendance = (attendanceInfoList: AttendanceInfo[]) => {
    const totalEvents = attendanceInfoList.length;
    const attendedEvents = attendanceInfoList.filter(
      (item) => item.attendance,
    ).length;
    return `${attendedEvents} / ${totalEvents}`;
  };
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
      <div className="p-4 border w-[1008px] h-[85vh] rounded-[20px]">
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
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2">이름</th>
                <th className="px-4 py-2">학과</th>
                <th className="px-4 py-2">결과</th>
                <th className="px-4 py-2">역할</th>
                {records[0].attendanceInfoList.map((attendanceInfo) => (
                  <th key={attendanceInfo.attendanceDate} className="px-4 py-2">
                    {attendanceInfo.attendanceDate.substring(8, 10)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className=" border-t">
              {records.map((record, index) => (
                <tr
                  key={index}
                  className="text-[#333335] font-pretendard text-base font-semibold"
                >
                  <td className="px-4 py-2">{record.memberName}</td>
                  <td className="px-4 py-2">{record.department}</td>
                  <td className="px-4 py-2">
                    {getTotalAttendance(record.attendanceInfoList)}
                  </td>
                  <td className="px-4 py-2">{record.memberRole}</td>
                  {record.attendanceInfoList.map(
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
                                checked={attendanceInfo.attendance}
                                onChange={() =>
                                  handleAttendanceChange(index, listIndex)
                                }
                              />
                              <label
                                htmlFor={`check+${index}${listIndex}`}
                                className="block"
                              >
                                {attendanceInfo.attendance ? (
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
                          ) : attendanceInfo.attendance ? (
                            'o'
                          ) : (
                            'x'
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
    </>
  );
};

export default AttendanceStatus;
