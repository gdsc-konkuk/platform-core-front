import { Card } from '@/types/Card';
import CloseGrayIcon from '/icons/close-gray.svg';
import { MouseEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SessionDeleteDialog from './SessionDeleteDialog';
import RetrospectionDialog from './RetrospectionDialog';

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
      className="absolute left-0 top-0 z-10 h-full w-full"
      onClick={handleBackgroundClick}
    >
      <div className="absolute right-0 top-0 z-50 flex h-screen w-[70vw] flex-col rounded-3xl bg-white px-8 py-12 shadow-[-1px_0_10px_1px_rgba(0,0,0,0.3)]">
        <img
          src={CloseGrayIcon}
          alt="close"
          className="h-6 w-6 cursor-pointer self-end"
          onClick={onClose}
        />

        <h1 className="mt-[18px] font-nanum text-[24px] font-extrabold text-[#333335]">
          {card.title}
        </h1>
        <span className="text[14px] mt-[10px] text-[#868687]">{card.date}</span>

        <div className="mt-[2px] flex gap-4 self-end">
          {activeTab === 'activity' ? (
            <>
              <Button className="border border-[#BEBEBF] bg-white px-5 py-[9px] text-black hover:bg-[#BEBEBF]">
                수정
              </Button>
              <SessionDeleteDialog>
                <Button className="border border-[#BEBEBF] bg-white px-5 py-[9px] text-black hover:bg-[#BEBEBF]">
                  삭제
                </Button>
              </SessionDeleteDialog>
            </>
          ) : (
            <>
              <RetrospectionDialog />
              <SessionDeleteDialog>
                <Button className="border border-[#BEBEBF] bg-white px-5 py-[9px] text-[#BEBEBF] hover:bg-[#BEBEBF] hover:text-white">
                  삭제
                </Button>
              </SessionDeleteDialog>
            </>
          )}
        </div>

        <nav className="mt-[20px] flex justify-around border-b-[3px] border-[#BEBEBF]">
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
          <div className="mt-[38px] flex flex-col">
            <div className="flex gap-3">
              {card.images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt="session"
                  className="h-[227px] w-1/3 bg-[#BEBEBF] object-contain"
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
