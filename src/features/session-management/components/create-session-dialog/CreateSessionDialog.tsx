import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import DateTimePicker from '@/components/ui/DateTimePicker';
import ImageUpload from './ImageUpload';
import { Textarea } from '@/components/ui/textarea';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateSessionFormFields,
  CreateSessionFormSchema,
} from '../../lib/CreateSessionFormSchema';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSession } from '../../apis/createSession';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

export default function CreateSessionDialog() {
  const today = new Date();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<CreateSessionFormFields>({
    resolver: zodResolver(CreateSessionFormSchema),
    defaultValues: {
      array: [],
      title: '',
      content: '',
      startDate: format(today, 'yyyy-MM-dd'),
      startHour: '0',
      startMinute: '0',
      endDate: format(today, 'yyyy-MM-dd'),
      endHour: '0',
      endMinute: '0',
    },
  });

  const { mutateAsync: submitSession } = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      toast({
        title: '이벤트 생성 성공',
        description: '이벤트가 성공적으로 생성되었습니다.',
      });
      setIsOpen(false);
      methods.reset();
    },
    onError: (error) => {
      toast({
        title: '이벤트 생성 실패',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit: SubmitHandler<CreateSessionFormFields> = async (data) => {
    await submitSession(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="font-pretendard mt-3 h-[50px] w-[135px] self-end rounded-[10px] border border-primary bg-white px-7 py-3 text-[17px] font-semibold text-primary hover:text-white"
          onClick={() => setIsOpen(true)}
        >
          이벤트 생성
        </Button>
      </DialogTrigger>
      <DialogContent className="font-pretendard max-w-[1000px] w-1/2 bg-white px-11 py-14 overflow-y-scroll h-[90vh] scrollbar scrollbar-track-transparent scrollbar-thumb-[#E3E3E3]">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription asChild>
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-12"
                onSubmit={methods.handleSubmit(onSubmit, (errors) => {
                  console.log(errors);
                })}
              >
                <div className="w-full flex flex-col gap-[18px]">
                  <Label
                    htmlFor="title"
                    className="font-semibold text-[#171719] text-[18px]"
                  >
                    제목
                  </Label>
                  <div className="flex gap-[6px] items-end">
                    <Input
                      {...methods.register('title')}
                      id="title"
                      maxLength={30}
                      className="bg-white w-2/3 h-[44px] border border-[#DADADA] rounded-[10px] px-[21px] py-[20px] text-[18px] text-[#171719]"
                    />
                    <span
                      className={cn(
                        'text-[14px] text-[#BEBEBF]',
                        methods.watch('title').length >= 30 && 'text-[#EA4335]',
                      )}
                    >{`${methods.watch('title').length}/30`}</span>
                  </div>
                  {methods.formState.errors.title && (
                    <span className="text-[14px] text-[#EA4335]">
                      {methods.formState.errors.title.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <h1 className="font-semibold text-[#171719] text-[18px]">
                    날짜 및 시간
                  </h1>
                  <DateTimePicker
                    title="시작 시간"
                    className="mt-[18px]"
                    calendar={
                      <Controller
                        name="startDate"
                        control={methods.control}
                        render={({ field }) => (
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onDayClick={(day) => {
                              methods.setValue(
                                'startDate',
                                format(day, 'yyyy-MM-dd'),
                              );
                            }}
                            initialFocus
                          />
                        )}
                      />
                    }
                    date={methods.watch('startDate')}
                    hour={methods.watch('startHour')}
                    setHour={(value) => methods.setValue('startHour', value)}
                    minute={methods.watch('startMinute')}
                    setMinute={(value) =>
                      methods.setValue('startMinute', value)
                    }
                  />
                  <DateTimePicker
                    title="종료 시간"
                    className="mt-[12px]"
                    calendar={
                      <Controller
                        name="endDate"
                        control={methods.control}
                        render={({ field }) => (
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onDayClick={(day) => {
                              methods.setValue(
                                'endDate',
                                format(day, 'yyyy-MM-dd'),
                              );
                            }}
                            initialFocus
                          />
                        )}
                      />
                    }
                    date={methods.watch('endDate')}
                    hour={methods.watch('endHour')}
                    setHour={(value) => methods.setValue('endHour', value)}
                    minute={methods.watch('endMinute')}
                    setMinute={(value) => methods.setValue('endMinute', value)}
                  />
                  {methods.formState.errors.startDate && (
                    <span className="text-[14px] text-[#EA4335]">
                      {methods.formState.errors.startDate.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-[18px]">
                  <Label
                    htmlFor="place"
                    className="font-semibold text-[#171719] text-[18px]"
                  >
                    장소
                  </Label>
                  <Input
                    {...methods.register('location')}
                    id="place"
                    className="bg-white w-full h-[44px] border border-[#DADADA] rounded-[10px] px-[21px] py-[20px] text-[18px] text-[#171719]"
                  />
                  {methods.formState.errors.location && (
                    <span className="text-[14px] text-[#EA4335]">
                      {methods.formState.errors.location.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-[18px]">
                  <h1 className="font-semibold text-[#171719] text-[18px]">
                    사진
                  </h1>
                  <ImageUpload />
                  {methods.formState.errors.array && (
                    <span className="text-[14px] text-[#EA4335]">
                      {methods.formState.errors.array.message}
                    </span>
                  )}
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
                      {...methods.register('content')}
                      id="description"
                      className="focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white w-full h-[200px] mt-[18px] border border-[#DADADA] rounded-[10px] px-[21px] py-[20px] text-[18px] text-[#171719]"
                      minLength={1}
                      maxLength={200}
                    />
                    <span
                      className={cn(
                        'absolute bottom-3 right-4 text-[14px] text-[#BEBEBF]',
                        methods.watch('content').length >= 200 &&
                        'text-[#EA4335]',
                      )}
                    >{`${methods.watch('content').length}/200`}</span>
                  </div>
                  <span className="text-[14px] text-[#BEBEBF] mt-2 self-end">
                    공백만으로 작성할 수 없습니다
                  </span>
                  <span className="text-[14px] text-[#BEBEBF] self-end">
                    200자를 초과할 수 없습니다
                  </span>
                  {methods.formState.errors.content && (
                    <span className="text-[14px] text-[#EA4335]">
                      {methods.formState.errors.content.message}
                    </span>
                  )}
                </div>

                <Button
                  className="mt-[35px] w-[67px] h-[41px] px-5 py-[9px] self-end"
                  type="submit"
                  disabled={methods.formState.isSubmitting}
                >
                  {methods.formState.isSubmitting ? '생성 중...' : '생성'}
                </Button>
              </form>
            </FormProvider>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
