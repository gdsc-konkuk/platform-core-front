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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { writeRetrospection } from '../../apis/writeRetrospection';
import { useToast } from '@/components/ui/use-toast';

interface RetrospectionDialogProps {
  id: number;
}

export default function RetrospectionDialog({ id }: RetrospectionDialogProps) {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: submitRetrospection, isPending } = useMutation({
    mutationFn: () => writeRetrospection(id, content),
    onSuccess: () => {
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['session'] });
      toast({
        title: '회고 작성 완료',
        description: '회고가 성공적으로 작성되었습니다.',
      });
      setIsOpen(false);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '회고 작성 실패',
        description: '회고 작성에 실패했습니다. 다시 시도해주세요.',
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="border border-primary bg-white px-5 py-[9px] text-primary hover:bg-primary hover:text-white"
          onClick={() => setIsOpen(true)}
        >
          작성
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="font-extrabold font-nanum text-[24px] text-[#333335]">
            회고 내용
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col">
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
              <Button
                className="mt-[35px] w-[67px] h-[41px] px-5 py-[9px] self-end"
                onClick={() => submitRetrospection()}
                disabled={isPending}
              >
                {isPending ? '작성 중..' : '작성'}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
