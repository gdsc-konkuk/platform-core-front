import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { saveAttendances } from '../apis/attendanceStatusRequest';
import { Member } from '../types';
import { toast } from '@/components/ui/use-toast';

export const useSaveAttendances = (
  recordsData: { data: Member[] } | undefined,
  selectedYear: number,
  selectedMonth: number,
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Member[] | null>(null);

  useEffect(() => {
    if (recordsData?.data) {
      setEditedData(JSON.parse(JSON.stringify(recordsData.data)));
    }
  }, [recordsData]);

  const mutation = useMutation({
    mutationFn: (
      attendanceUpdateInfoList: { participantId: number; attended: boolean }[],
    ) =>
      saveAttendances(attendanceUpdateInfoList, {
        batch: '24-25',
        year: selectedYear.toString(),
        month: (selectedMonth + 1).toString(),
      }),
    onSuccess: () => {
      toast({
        title: '저장되었습니다',
        description: '출석이 성공적으로 저장되었습니다.',
      });
    },
    onError: (error: Error) => {
      console.error('저장에 실패했습니다:', error);
      toast({
        title: '저장에 실패하였습니다',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSaveClick = () => {
    if (editedData) {
      const attendanceUpdateInfoList = editedData.flatMap((member) =>
        member.attendanceInfoList.map((attendance) => ({
          participantId: attendance.participantId,
          attended: attendance.attended,
        })),
      );
      mutation.mutate(attendanceUpdateInfoList);
    }
    setIsEditing(false);
  };

  const handleCheckboxChange = (
    memberIndex: number,
    attendanceIndex: number,
  ) => {
    if (editedData) {
      const updatedData = [...editedData];
      updatedData[memberIndex].attendanceInfoList[attendanceIndex].attended =
        !updatedData[memberIndex].attendanceInfoList[attendanceIndex].attended;
      setEditedData(updatedData);
    }
  };

  return {
    handleSaveClick,
    isEditing,
    setIsEditing,
    handleCheckboxChange,
    editedData,
  };
};
