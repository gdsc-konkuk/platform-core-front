import { z } from 'zod';

export const CreateMailFormSchema = z.object({
  date: z.string().min(1, '날짜를 입력해주세요'),
  hour: z.string().min(1, '시간을 입력해주세요'),
  minute: z.string().min(1, '분을 입력해주세요'),
  subject: z.string().min(1, '제목을 입력해주세요'),
  recieverInfos: z
    .array(
      z.object({
        name: z.string().min(1, '이름을 입력해주세요'),
        email: z.string().email('이메일 형식이 아닙니다'),
      }),
    )
    .min(1, '수신자를 추가해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
});

export type CreateMailFormFields = z.infer<typeof CreateMailFormSchema>;
