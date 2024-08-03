import React, { useState } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

dayjs.extend(localeData);

interface AttendanceRecord {
  name: string;
  department: string;
  role: string;
  attendance: Record<string, boolean>;
}

const initialRecords: AttendanceRecord[] = [
  {
    name: '이영지',
    department: '스마트ICT융합공학과',
    role: 'Member',
    attendance: {
      '02': false,
      '09': false,
      '16': false,
      '23': false,
      '29': false,
    },
  },
];

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
];

const AttendanceStatus: React.FC = () => {
  const [records, setRecords] = useState<Member[]>(testMember);
  const [isEditing, setIsEditing] = useState(false);

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(currentDate.year());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month());

  const handleAttendanceChange = (
    index: number,
    listIndex: number,
    attendanceInfo: AttendanceInfo,
  ) => {
    const newRecords = [...records];
    newRecords[index].attendanceInfoList[listIndex].attendance =
      !newRecords[index].attendanceInfoList[listIndex].attendance;
    setRecords(newRecords);
  };

  const getTotalAttendance = (attendance: Record<string, boolean>) => {
    const totalEvents = Object.keys(attendance).length;
    const attendedEvents = Object.values(attendance).filter(
      (status) => status,
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-start items-center mb-4">
          <Select onValueChange={handleYearChange}>
            <SelectTrigger className="w-[110px] mr-2 text-[#171719] font-[Pretendard] text-[22px] font-[600]">
              <SelectValue placeholder={selectedYear} />
            </SelectTrigger>
            <SelectContent className="text-[#171719] font-[Pretendard] text-[22px] font-[600]">
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i} value={(dayjs().year() - 5 + i).toString()}>
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

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
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
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{record.memberName}</td>
              <td className="px-4 py-2">{record.department}</td>
              <td className="px-4 py-2">5</td>
              <td className="px-4 py-2">{record.memberRole}</td>
              {record.attendanceInfoList.map((attendanceInfo, listIndex) => (
                <td
                  key={attendanceInfo.attendanceId}
                  className="px-4 py-2 text-center"
                >
                  {isEditing ? (
                    <input
                      type="checkbox"
                      checked={attendanceInfo.attendance}
                      onChange={() =>
                        handleAttendanceChange(index, listIndex, attendanceInfo)
                      }
                    />
                  ) : attendanceInfo.attendance ? (
                    '✓'
                  ) : (
                    '✗'
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceStatus;
