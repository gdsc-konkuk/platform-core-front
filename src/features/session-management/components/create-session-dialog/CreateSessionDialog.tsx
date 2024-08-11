'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import DateTimePicker from '@/components/ui/DateTimePicker';
import ImageUpload from './ImageUpload';
import { Textarea } from '@/components/ui/textarea';

export default function CreateSessionDialog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-pretendard mt-3 h-[50px] w-[135px] self-end rounded-[10px] border border-primary bg-white px-7 py-3 text-[17px] font-semibold text-primary hover:text-white">
          이벤트 생성
        </Button>
      </DialogTrigger>
      <DialogContent className="font-pretendard max-w-[1000px] w-1/2 bg-white px-11 py-14 overflow-y-scroll h-[90vh] scrollbar scrollbar-track-transparent scrollbar-thumb-[#E3E3E3]">
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-12">
            <div className="w-full flex flex-col gap-[18px]">
              <Label
                htmlFor="title"
                className="font-semibold text-[#171719] text-[18px]"
              >
                제목
              </Label>
              <div className="flex gap-[6px] items-end">
                <Input
                  id="title"
                  maxLength={30}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white w-2/3 h-[44px] border border-[#DADADA] rounded-[10px] px-[21px] py-[20px] text-[18px] text-[#171719]"
                />
                <span
                  className={cn(
                    'text-[14px] text-[#BEBEBF]',
                    title.length >= 30 && 'text-[#EA4335]',
                  )}
                >{`${title.length}/30`}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="font-semibold text-[#171719] text-[18px]">
                날짜 및 시간
              </h1>
              <DateTimePicker title="시작 시간" className="mt-[18px]" />
              <DateTimePicker title="종료 시간" className="mt-[12px]" />
            </div>

            <div className="flex flex-col gap-[18px]">
              <Label
                htmlFor="place"
                className="font-semibold text-[#171719] text-[18px]"
              >
                장소
              </Label>
              <Input
                id="place"
                className="bg-white w-full h-[44px] border border-[#DADADA] rounded-[10px] px-[21px] py-[20px] text-[18px] text-[#171719]"
              />
            </div>

            <div className="flex flex-col gap-[18px]">
              <h1 className="font-semibold text-[#171719] text-[18px]">사진</h1>
              <ImageUpload />
            </div>

            <div className="flex flex-col">
              <Label
                htmlFor="description"
                className="font-semibold text-[#171719] text-[18px]"
              >
                상세 설명
              </Label>
              <div className="relative">
                <Textarea
                  id="description"
                  className="focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white w-full h-[200px] mt-[18px] border border-[#DADADA] rounded-[10px] px-[21px] py-[20px] text-[18px] text-[#171719]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minLength={1}
                  maxLength={200}
                />
                <span
                  className={cn(
                    'absolute bottom-3 right-4 text-[14px] text-[#BEBEBF]',
                    description.length >= 200 && 'text-[#EA4335]',
                  )}
                >{`${description.length}/200`}</span>
              </div>
              <span className="text-[14px] text-[#BEBEBF] mt-2 self-end">
                공백만으로 작성할 수 없습니다
              </span>
              <span className="text-[14px] text-[#BEBEBF] self-end">
                200자를 초과할 수 없습니다
              </span>
            </div>

            <Button className="mt-[35px] w-[67px] h-[41px] px-5 py-[9px] self-end">
              생성
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
