import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { CreateQRModal } from './CreateQRModal';
import { QRModal } from './QRModal';

interface ModalManagerProps {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

export const ModalManager: React.FC<ModalManagerProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(true);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(0);

  const closeFirstModalAndOpenSecond = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };
  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <div>
      {isFirstModalOpen && (
        <CreateQRModal
          closeFirstModalAndOpenSecond={closeFirstModalAndOpenSecond}
          title={title}
          setTitle={setTitle}
          numberOfPeople={numberOfPeople}
          setNumberOfPeople={setNumberOfPeople}
        />
      )}

      {isSecondModalOpen && (
        <QRModal
          selectedDate={selectedDate}
          title={title}
          numberOfPeople={numberOfPeople}
          closeSecondModal={closeSecondModal}
        />
      )}
    </div>
  );
};
