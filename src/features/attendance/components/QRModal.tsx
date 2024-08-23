import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import dayjs from 'dayjs';
import { EventData } from './Attendance';

import QRCode from './LogoQRcode';
import { useMutation } from '@tanstack/react-query';
import {
  deleteAttendance,
  deleteAttendanceQR,
} from '../apis/attendanceRequest';

interface QRModalProps {
  selectedDate: dayjs.Dayjs;
  title: string;
  closeSecondModal: () => void;
  numberOfPeople: number;
  selectedEvent: EventData;
  attendanceId: number;
  attendUrl: string;
}

export const QRModal: React.FC<QRModalProps> = ({
  selectedDate,
  title,
  closeSecondModal,
  numberOfPeople,
  selectedEvent,
  attendanceId,
  attendUrl,
}) => {
  const [currentAttendance, setCurrentAttendance] = useState(0);

  const deleteAttendanceMutation = useMutation({
    mutationFn: (attendanceId: number) => deleteAttendance(attendanceId),
    onSuccess: (data) => {
      console.log('Attendance deleted successfully:', data);
    },
    onError: (error: Error) => {
      console.error('Error deleting attendance:', error);
    },
  });

  const deleteQRMutation = useMutation({
    mutationFn: (attendanceId: number) => deleteAttendanceQR(attendanceId),
    onSuccess: (data) => {
      console.log('QR deleted successfully:', data);
    },
    onError: (error: Error) => {
      console.error('Error deleting QR:', error);
    },
  });

  const handleDeleteAttendance = (attendanceId: number) => {
    deleteAttendanceMutation.mutate(attendanceId);
    closeSecondModal();
  };
  const handleCloseQr = (attendanceId: number) => {
    deleteQRMutation.mutate(attendanceId);
    closeSecondModal();
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="w-[794px] h-[500px] flex flex-row gap-[86px] justify-center items-center bg-[#ffffff] p-4 rounded-[25px] filter drop-shadow-[0px_4px_10px_rgba(0,0,0,0.15)]">
          <div className="bg-[#d4d4d4] rounded-[25px]">
            <QRCode attendUrl={attendUrl} />
          </div>
          <div className="w-[188px] h-[330px] pt-[54px] flex flex-col justify-start items-center">
            <h1 className="text-[30px] mb-[20px] font-pretendard text-[#171719] font-[700]">
              {selectedEvent?.title}
            </h1>
            <p className="text-[18px] mb-[50px] font-pretendard text-[#535355] font-[400] leading-[20px] tracking-[0.18px]">
              {selectedDate.format('YYYY.MM.DD')}
            </p>
            <p className="text-[#333335] mb-[66px] font-pretendard text-[24px] font-semibold leading-[36px]">{`${currentAttendance}/${numberOfPeople}`}</p>
            <div className="w-[100%] gap-[16px] flex">
              <Button
                onClick={() => handleDeleteAttendance(attendanceId)}
                className="px-[28px] py-[12px] bg-white text-[#0DAA5C] border border-[#BEBEBF] hover:bg-[#f2f2f2]"
              >
                삭제
              </Button>
              <Button
                onClick={() => handleCloseQr(attendanceId)}
                className="px-[28px] py-[12px]"
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
