import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
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

import UpTriangleIcon from '/icons/up-triangle.svg';
import DownTriangleIcon from '/icons/down-triangle.svg';

interface DateTimePickerProps {
  className?: string;
  title?: string;
  calendar: ReactNode;
  date: string;
  hour: string;
  setHour: (hour: string) => void;
  minute: string;
  setMinute: (minute: string) => void;
}

export default function DateTimePicker({
  className,
  title,
  calendar,
  date,
  hour,
  setHour,
  minute,
  setMinute,
}: DateTimePickerProps) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isHourOpen, setIsHourOpen] = useState(false);
  const [isMinuteOpen, setIsMinuteOpen] = useState(false);

  return (
    <div className={cn('flex items-center', className)}>
      {title && (
        <span className="text-[15px] mr-[10px] font-medium text-[#535355]">
          {title}
        </span>
      )}
      <Popover onOpenChange={() => setIsDateOpen((prev) => !prev)}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'px-3 py-[10px] w-[180px] h-[44px] rounded-[10px] justify-start font-normal bg-white text-[16px] text-[#171719] font-medium',
            )}
          >
            <div className="flex w-full items-center justify-between">
              <span>{date}</span>
              <img
                src={isDateOpen ? UpTriangleIcon : DownTriangleIcon}
                alt="triangle"
                className="h-[24px] w-[24px]"
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">{calendar}</PopoverContent>
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
              <span>{`${hour !== '00' ? hour : 0}시`}</span>
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
              onClick={() => setHour(index.toString())}
              className={cn(
                'text-[16px] text-[#AEAEAE] hover:text-[#171719]',
                hour === index.toString() && 'text-[#171710]',
              )}
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
              <span>{minute.padStart(2, '0')}분</span>
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
                onClick={() => setMinute(minuteValue.toString())}
                className={cn(
                  'text-[16px] text-[#AEAEAE] hover:text-[#171719]',
                  minute === minuteValue.toString() && 'text-[#171710]',
                )}
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
