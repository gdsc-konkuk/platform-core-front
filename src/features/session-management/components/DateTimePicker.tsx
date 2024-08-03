import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
  const [isDateOpen, setIsDateOpen] = useState(false);

  return (
    <div className={cn('flex items-center', className)}>
      <span className="text-[15px] font-medium text-[#535355]">{title}</span>
      <Popover onOpenChange={() => setIsDateOpen((prev) => !prev)}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'px-3 py-[10px] w-[158px] h-[44px] rounded-[10px] justify-start font-normal ml-[10px] bg-white text-[16px] text-[#171719] font-medium',
            )}
          >
            <div className="flex justify-between items-center w-full">
              <span>
                {date
                  ? format(date, 'yyyy-MM-dd')
                  : format(new Date(), 'yyyy-MM-dd')}
              </span>
              <img
                src={isDateOpen ? UpTriangleIcon : DownTriangleIcon}
                alt="triangle"
                className="w-[24px] h-[24px]"
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
    </div>
  );
}
