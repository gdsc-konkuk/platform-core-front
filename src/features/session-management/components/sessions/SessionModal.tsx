import { Card } from '@/types/Card';
import CloseGrayIcon from '/icons/close-gray.svg';
import { MouseEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SessionModalProps {
  card: Card;
  onClose: () => void;
}

export default function SessionModal({ card, onClose }: SessionModalProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'retrospection'>(
    `activity`,
  );

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full z-10"
      onClick={handleBackgroundClick}
    >
      <div className="z-50 bg-white flex flex-col absolute top-0 right-0 h-screen w-[70vw] px-8 py-12 rounded-3xl shadow-[-1px_0_10px_1px_rgba(0,0,0,0.3)]">
        <img
          src={CloseGrayIcon}
          alt="close"
          className="w-6 h-6 cursor-pointer self-end"
          onClick={onClose}
        />

        <h1 className="font-nanum font-extrabold text-[24px] text-[#333335] mt-[18px]">
          {card.title}
        </h1>
        <span className="text[14px] text-[#868687] mt-[10px]">{card.date}</span>

        <div className="flex gap-4 mt-[2px] self-end">
          {activeTab === 'activity' ? (
            <>
              <Button className="px-5 py-[9px] bg-white text-black border border-[#BEBEBF] hover:bg-[#BEBEBF]">
                수정
              </Button>
              <Button className="px-5 py-[9px] bg-white text-black border border-[#BEBEBF] hover:bg-[#BEBEBF]">
                삭제
              </Button>
            </>
          ) : (
            <>
              <Button className="px-5 py-[9px] bg-white text-primary border border-primary hover:bg-[#BEBEBF]">
                작성
              </Button>
              <Button className="px-5 py-[9px] bg-white text-[#BEBEBF] border border-[#BEBEBF] hover:bg-[#BEBEBF]">
                삭제
              </Button>
            </>
          )}
        </div>

        <nav className="flex mt-[20px] border-b-[3px] border-[#BEBEBF] justify-around">
          <div
            className={cn(
              'py-[18px] w-1/4  text-center cursor-pointer',
              activeTab === 'activity' &&
              'border-b-[3px] border-primary -mb-[3px]',
            )}
            onClick={() => setActiveTab('activity')}
          >
            활동 내용
          </div>
          <div
            className={cn(
              'py-[18px] w-1/4  text-center cursor-pointer',
              activeTab === 'retrospection' &&
              'border-b-[3px] border-primary -mb-[3px]',
            )}
            onClick={() => setActiveTab('retrospection')}
          >
            회고
          </div>
        </nav>

        {activeTab === 'activity' ? (
          <div className="flex flex-col mt-[38px]">
            <div className="flex gap-3">
              {card.images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt="session"
                  className="w-1/3 h-[227px] object-contain bg-[#BEBEBF]"
                />
              ))}
            </div>

            <div className="mt-[34px] text-black">{card.description}</div>
          </div>
        ) : (
          <div>
            <div
              className={cn(
                'mt-[38px] text-[#BEBEBF]',
                card.retrospection.length > 0 && 'text-black',
              )}
            >
              {card.retrospection.length > 0
                ? card.retrospection
                : '내용이 없습니다.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
