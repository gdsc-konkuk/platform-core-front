import { useState } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
  };

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf('month').day();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[24px] font-extrabold">출석</h1>
        <div>
          <select
            value={currentDate.year()}
            onChange={(e) =>
              setCurrentDate(currentDate.year(Number(e.target.value)))
            }
            className="mr-2"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={dayjs().year() - 5 + i}>
                {dayjs().year() - 5 + i}
              </option>
            ))}
          </select>
          <select
            value={currentDate.month()}
            onChange={(e) =>
              setCurrentDate(currentDate.month(Number(e.target.value)))
            }
          >
            {dayjs()
              .localeData()
              .months()
              .map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={i}></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => (
          <div
            key={i}
            className="p-2 text-center cursor-pointer hover:bg-gray-200"
            onClick={() => handleDateClick(currentDate.date(i + 1))}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold">
              {selectedDate.format('YYYY-MM-DD')}
            </h2>
            <button
              onClick={() => setSelectedDate(null)}
              className="mt-4 px-4 py-2 bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
