import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import GrayCloseIcon from '/icons/close-gray.svg';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

dayjs.extend(localeData);

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedYear, setSelectedYear] = useState(currentDate.year());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month());
  const borderRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(0);

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
    <div className="px-4 flex flex-col items-center bg-[#ffffff]">
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
                key={i}
                className="w-[120px] h-[95px] px-[16px] py-[10px] rounded-[10px] cursor-pointer bg-[#F9F9F9] hover:bg-gray-200 transition duration-300"
                onClick={() => handleDateClick(currentDate.date(i + 1))}
              >
                <span className="text-[#535355] font-[Pretendard] text-[20px] font-[600]">
                  {i + 1}
                </span>
                {/* <div className="w-[11px] h-[11px] bg-[#9747FF] rounded-[11px]"></div>
                <div className="w-[11px] h-[11px] bg-[#EA4335] rounded-[11px]"></div> */}
              </div>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-10 flex justify-center items-center">
            <div className="w-[70%] h-[100%] relative flex flex-col justify-center items-center bg-[#ffffff] p-4 rounded-[10px] filter drop-shadow-[0px_4px_10px_rgba(0,0,0,0.15)]">
              <h2 className="top-[78px] left-[60px] absolute font-['NanumSquareRoundEB'] text-[24px] font-extrabold">
                출석 QR 생성
              </h2>
              <form className="flex flex-col w-[400px] h-[422px] relative">
                <label
                  htmlFor="title"
                  className="mb-[18px] text-[#5C5353] font-Pretendard] text-[17px] font-[600] leading-[1.5] tracking-[0.17px]"
                >
                  제목
                </label>
                <div className="relative w-full mb-[80px]">
                  <Input
                    disabled
                    id="title"
                    className="w-[400px] h-[50px] rounded-[10px] border-[#DADADA] bg-white px-[12px] text-[16px] focus:border-[#b1b1b1]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => {
                      borderRef.current?.style.setProperty(
                        'background-color',
                        '#b1b1b1',
                      );
                    }}
                    onBlur={() => {
                      borderRef.current?.style.setProperty(
                        'background-color',
                        '#b1b1b1',
                      );
                    }}
                  />
                  <img
                    src={GrayCloseIcon}
                    alt="close"
                    className="absolute right-4 top-[14px] cursor-pointer"
                    onClick={() => setTitle('')}
                  />
                </div>
                <label
                  htmlFor="number"
                  className="mb-[18px] text-[#5C5353] font-Pretendard] text-[17px] font-[600] leading-[1.5] tracking-[0.17px]"
                >
                  총 인원 수
                </label>
                <div className="relative w-full">
                  <Input
                    disabled
                    type="number"
                    id="number"
                    className="w-[400px] h-[50px] rounded-[10px] border-[#DADADA] bg-white px-[12px] text-[16px] focus:border-[#b1b1b1]"
                    value={numberOfPeople.toString()}
                    onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                    onFocus={() => {
                      borderRef.current?.style.setProperty(
                        'background-color',
                        '#b1b1b1',
                      );
                    }}
                    onBlur={() => {
                      borderRef.current?.style.setProperty(
                        'background-color',
                        '#b1b1b1',
                      );
                    }}
                  />
                  <img
                    src={GrayCloseIcon}
                    alt="close"
                    className="absolute right-4 top-[14px] cursor-pointer"
                    onClick={() => setNumberOfPeople(0)}
                  />
                </div>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="absolute bottom-[0px] right-[0px] px-[28px] py-[12px] rounded-[10px] bg-[#ECECED] text-[17px] font-[Pretendard] font-[600] text-[#BEBEBF]"
                >
                  확인
                </button>
              </form>
            </div>
          </div>
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
