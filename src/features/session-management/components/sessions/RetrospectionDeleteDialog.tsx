import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { writeRetrospection } from '../../apis/writeRetrospection';

interface SessionDeleteDialogProps {
  id: number;
  children: React.ReactNode;
}

export default function RetrospectionDeleteDialog({
  id,
  children,
}: SessionDeleteDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: () => writeRetrospection(id, ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      toast({
        title: '삭제 완료',
        description: '해당 회고를 삭제했습니다.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '삭제 실패',
        description: '회고 삭제에 실패했습니다. 다시 시도해주세요.',
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="gap-0 rounded-[20px] border-none bg-white p-0 sm:rounded-[20px]">
        <AlertDialogHeader className="h-full w-full">
          <AlertDialogTitle />
          <AlertDialogDescription className="px-20 py-[41px] text-center text-[20px] text-[#303030]">
            정말로 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <div className="flex h-full w-full">
            <AlertDialogCancel asChild>
              <div className="h-[70px] flex-1 cursor-pointer rounded-none rounded-bl-[20px] border-r border-r-[#EBEBEF] bg-white text-center text-[20px] text-[#949494]">
                취소
              </div>
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => mutateAsync()} asChild>
              <div className="h-[70px] flex-1 cursor-pointer rounded-none rounded-br-[20px] border-r border-t border-t-[#EBEBEF] bg-white text-center text-[20px] hover:text-white">
                <div className="w-full h-full text-primary hover:text-white flex justify-center items-center">
                  삭제하기
                </div>
              </div>
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
