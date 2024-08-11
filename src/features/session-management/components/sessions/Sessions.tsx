import { Card } from '@/types/Card';
import { useState } from 'react';
import SessionModal from './SessionModal';
const sessionData = [
  {
    id: 1,
    title: '이병직 사우로스 1호',
    date: '2024.01.01',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    description: '예시예시예시예시예시예시예시예시예시예시예시예시예시예시예시',
    retrospection: '',
  },
  {
    id: 2,
    title: '이병직 사우로스 1호',
    date: '2024.01.01',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    description: '예시예시예시예시예시예시예시예시예시예시예시예시예시예시예시',
    retrospection: '',
  },
  {
    id: 3,
    title: '이병직 사우로스 1호',
    date: '2024.01.01',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    description: '예시예시예시예시예시예시예시예시예시예시예시예시예시예시예시',
    retrospection: '',
  },
  {
    id: 4,
    title: '이병직 사우로스 1호',
    date: '2024.01.01',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    description: '예시예시예시예시예시예시예시예시예시예시예시예시예시예시예시',
    retrospection: '',
  },
  {
    id: 5,
    title: '이병직 사우로스 1호',
    date: '2024.01.01',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    description: '예시예시예시예시예시예시예시예시예시예시예시예시예시예시예시',
    retrospection: '',
  },
];

export default function Sessions() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  return (
    <div className="mt-[60px] overflow-scroll scrollbar-hide">
      <div className="grid-auto-fit grid grid-flow-row gap-[22px]">
        {sessionData.map((card) => (
          <div
            key={card.id}
            className="flex h-[325px] w-[328px] cursor-pointer flex-col justify-self-center rounded-[10px] border border-[#DADADA] px-[21px] py-[20px]"
            onClick={() => setSelectedCard(card)}
          >
            <h1 className="text-[18px] font-semibold text-[#171719]">
              {card.title}
            </h1>
            <span className="mt-[2px] text-[14px] text-[#868687]">
              {card.date}
            </span>
            <img
              src={card.images[0]}
              alt="session"
              className="mt-[10px] h-[150px] w-[286px] rounded-[10px]"
            />
            <p className="mt-[10px] text-[15px] text-[#333335]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
      {selectedCard && (
        <SessionModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
