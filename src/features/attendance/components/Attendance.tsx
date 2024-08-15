import { useState } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ModalManager } from './ModalManager';
dayjs.extend(localeData);

interface EventData {
  eventId: number;
  attendanceId: number;
  title: string | null;
  startAt: number;
}

const data: EventData[] = [
  {
    eventId: 0,
    attendanceId: 0,
    title: null,
    startAt: 2,
  },
  {
    eventId: 1,
    attendanceId: 1,
    title: null,
    startAt: 5,
  },
  {
    eventId: 2,
    attendanceId: 2,
    title: null,
    startAt: 12,
  },
];

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedYear, setSelectedYear] = useState(currentDate.year());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month());

  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
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
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf('month').day();

  return (
    <div className="flex flex-col items-center bg-[#ffffff]">
      <div>
        <h1 className="mb-[3vh] font-['NanumSquareRoundEB'] text-[24px] font-extrabold">
          출석
        </h1>
        <div className="w-[1008px] pt-11 pl-14 pb-11 pr-11 border border-solid border-[#DADADA] rounded-3xl ">
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

          <div className="w-[full] h-[1px] border-t my-4"></div>
          <div className="grid grid-cols-7 gap-2 ">
            {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
              <div
                key={day}
                className="mb-[18px] text-start text-[#868687] text-[16px] font-[Pretendard] font-[600]"
              >
                {day}
              </div>
            ))}

            {Array.from({ length: firstDayOfMonth - 1 }, (_, i) => (
              <div key={i}></div>
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => (
              <div
                key={'day' + i}
                className="w-[120px] h-[95px] px-[16px] py-[10px] rounded-[10px] cursor-pointer bg-[#F9F9F9] hover:bg-gray-200 transition duration-300"
                onClick={() => handleDateClick(currentDate.date(i + 1))}
              >
                <span className="text-[#535355] font-[Pretendard] text-[20px] font-[600]">
                  {i + 1}
                </span>
                {data.map((monthEvent: EventData) => {
                  return monthEvent.startAt === i ? (
                    <div
                      key={'event' + i}
                      className="w-[10px] h-[10px] bg-[#9747FF] rounded-[11px]"
                    ></div>
                  ) : null;
                })}
                {/* <div className="w-[11px] h-[11px] bg-[#9747FF] rounded-[11px]"></div>
                <div className="w-[10px] h-[10px] bg-[#EA4335] rounded-[11px]"></div> */}
              </div>
            ))}
          </div>
        </div>

        {selectedDate && (
          <ModalManager
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
      </div>
    </div>
  );
}

{
  /* 
          <CreateQRModal
          selectedDate={selectedDate}
          title={setTitle}
          setTitle={setTitle}
        /> */
}
