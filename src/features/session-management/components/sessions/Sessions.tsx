import { useState } from 'react';
import SessionModal from './SessionModal';
import { getSessions } from '../../apis/getSessions';
import { useQuery } from '@tanstack/react-query';
import { Session } from '../../types/session';

export default function Sessions() {
  const [selectedCard, setSelectedCard] = useState<Session | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  });

  const sessionData = data?.data.eventBriefs || [];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mt-[60px] overflow-scroll scrollbar-hide">
      <div className="grid-auto-fit grid grid-flow-row gap-[22px]">
        {sessionData.length === 0 ? (
          <h1>데이터가 없습니다.</h1>
        ) : (
          sessionData.map((card: Session) => (
            <div
              key={card.id}
              className="flex h-[325px] w-[328px] cursor-pointer flex-col justify-self-center rounded-[10px] border border-[#DADADA] px-[21px] py-[20px]"
              onClick={() => setSelectedCard(card)}
            >
              <h1 className="text-[18px] font-semibold text-[#171719]">
                {card.title}
              </h1>
              <span className="mt-[2px] text-[14px] text-[#868687]">
                {card.startAt.split('T')[0].replace(/-/g, '.')}
              </span>
              <img
                src={card.thumbnail}
                alt="session"
                className="mt-[10px] h-[150px] w-[286px] rounded-[10px] object-cover"
              />
              <p className="mt-[10px] text-[15px] text-[#333335]">
                {card.content}
              </p>
            </div>
          ))
        )}
      </div>
      {selectedCard && (
        <SessionModal
          id={selectedCard.id}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
