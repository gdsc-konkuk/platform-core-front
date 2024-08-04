import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function RetrospectionDialog() {
  const [content, setContent] = useState('');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border border-primary bg-white px-5 py-[9px] text-primary hover:bg-primary hover:text-white">
          작성
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="font-extrabold font-nanum text-[24px] text-[#333335]">
            회고 내용
          </DialogTitle>
          <DialogDescription className="flex flex-col">
            <Label
              htmlFor="content"
              className="font-semibold text-[#171719] text-[18px] mt-[38px]"
            >
              상세 설명
            </Label>
            <div className="relative">
              <Textarea
                id="content"
                className="focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white w-full h-[200px] mt-[18px] border border-[#DADADA] rounded-[10px] px-[21px] py-[20px] text-[18px] text-[#171719]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                minLength={1}
                maxLength={200}
              />
              <span
                className={cn(
                  'absolute bottom-3 right-4 text-[14px] text-[#BEBEBF]',
                  content.length >= 200 && 'text-[#EA4335]',
                )}
              >{`${content.length}/200`}</span>
            </div>
            <span className="text-[14px] text-[#BEBEBF] mt-2 self-end">
              공백만으로 작성할 수 없습니다
            </span>
            <span className="text-[14px] text-[#BEBEBF] self-end">
              200자를 초과할 수 없습니다
            </span>
            <Button className="mt-[35px] w-[67px] h-[41px] px-5 py-[9px] self-end">
              생성
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
