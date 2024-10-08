import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp',
];

export const CreateSessionFormSchema = z
  .object({
    array: z.array(
      z
        .any()
        .refine(
          (file) => file?.size <= MAX_FILE_SIZE,
          '파일 크기는 5MB 이하로 업로드 가능합니다.',
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          '.jpg, .jpeg, .png, .webp 파일만 업로드 가능합니다.',
        ),
    ),
    title: z
      .string()
      .min(1, '제목을 입력해주세요.')
      .max(30, '제목은 30자 이내로 입력해주세요.'),
    content: z
      .string()
      .min(1, '내용을 입력해주세요.')
      .max(200, '내용은 200자 이내로 입력해주세요.'),
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식을 지켜주세요.'),
    startHour: z.string().regex(/^\d{1,2}$/, '시간 형식을 지켜주세요.'),
    startMinute: z.string().regex(/^\d{1,2}$/, '시간 형식을 지켜주세요.'),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식을 지켜주세요.'),
    endHour: z.string().regex(/^\d{1,2}$/, '시간 형식을 지켜주세요.'),
    endMinute: z.string().regex(/^\d{1,2}$/, '시간 형식을 지켜주세요.'),
    location: z.string().min(1, '장소를 입력해주세요.'),
  })
  .refine(
    (data) => {
      const start = new Date(
        `${data.startDate}T${data.startHour.padStart(2, '0')}:${data.startMinute.padStart(2, '0')}`,
      );
      const end = new Date(
        `${data.endDate}T${data.endHour.padStart(2, '0')}:${data.endMinute.padStart(2, '0')}`,
      );
      return start < end;
    },
    {
      message: '종료 시간은 시작 시간보다 빠를 수 없습니다.',
      path: ['startDate'],
    },
  );

export type CreateSessionFormFields = z.infer<typeof CreateSessionFormSchema>;
