import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { format } from 'date-fns';
import UpTriangleIcon from '/icons/up-triangle.svg';
import DownTriangleIcon from '/icons/down-triangle.svg';

interface DateTimePickerProps {
  className?: string;
  title: string;
}

export default function DateTimePicker({
  className,
  title,
}: DateTimePickerProps) {
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isHourOpen, setIsHourOpen] = useState(false);
  const [isMinuteOpen, setIsMinuteOpen] = useState(false);

  return (
    <div className={cn('flex items-center', className)}>
      <span className="text-[15px] font-medium text-[#535355]">{title}</span>
      <Popover onOpenChange={() => setIsDateOpen((prev) => !prev)}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'px-3 py-[10px] w-[180px] h-[44px] rounded-[10px] justify-start font-normal ml-[10px] bg-white text-[16px] text-[#171719] font-medium',
            )}
          >
            <div className="flex w-full items-center justify-between">
              <span>
                {date
                  ? format(date, 'yyyy-MM-dd')
                  : format(new Date(), 'yyyy-MM-dd')}
              </span>
              <img
                src={isDateOpen ? UpTriangleIcon : DownTriangleIcon}
                alt="triangle"
                className="h-[24px] w-[24px]"
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <DropdownMenu onOpenChange={() => setIsHourOpen((prev) => !prev)}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'px-3 py-[10px] w-[140px] h-[44px] rounded-[10px] justify-start font-normal ml-[10px] bg-white text-[16px] text-[#171719] font-medium',
            )}
          >
            <div className="flex w-full items-center justify-between">
              <span>{`${hour}시`}</span>
              <img
                src={isHourOpen ? UpTriangleIcon : DownTriangleIcon}
                alt="triangle"
                className="h-[24px] w-[24px]"
              />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0 w-[124px] h-[300px] overflow-y-scroll scrollbar scrollbar-thumb-[#DBDBDE] scrollbar-track-transparent">
          {[...Array(24)].map((_, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => setHour(index)}
              className={cn(
                'text-[16px] text-[#AEAEAE] hover:text-[#171719]',
                hour === index && 'text-[#171710]',
              )}
              onChange={() => setHour(index)}
            >
              {`${index}시`}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu onOpenChange={() => setIsMinuteOpen((prev) => !prev)}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'px-3 py-[10px] w-[140px] h-[44px] rounded-[10px] justify-start font-normal ml-[10px] bg-white text-[16px] text-[#171719] font-medium',
            )}
          >
            <div className="flex w-full items-center justify-between">
              <span>{minute < 10 ? `0${minute}분` : `${minute}분`}</span>
              <img
                src={isMinuteOpen ? UpTriangleIcon : DownTriangleIcon}
                alt="triangle"
                className="h-[24px] w-[24px]"
              />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0 w-[124px] h-[300px] overflow-y-scroll scrollbar scrollbar-thumb-[#DBDBDE] scrollbar-track-transparent">
          {[...Array(12)].map((_, index) => {
            const minuteValue = index * 5;
            const displayValue =
              minuteValue < 10 ? `0${minuteValue}` : minuteValue;

            return (
              <DropdownMenuItem
                key={index}
                onClick={() => setMinute(minuteValue)}
                className={cn(
                  'text-[16px] text-[#AEAEAE] hover:text-[#171719]',
                  minute === minuteValue && 'text-[#171710]',
                )}
                onChange={() => setMinute(minuteValue)}
              >
                {`${displayValue}분`}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
