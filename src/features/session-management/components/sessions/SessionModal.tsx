import CloseGrayIcon from '/icons/close-gray.svg';
import { MouseEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SessionDeleteDialog from './SessionDeleteDialog';
import RetrospectionDialog from './RetrospectionDialog';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '../../apis/getSession';
import RetrospectionDeleteDialog from './RetrospectionDeleteDialog';
import EditSessionDialog from './EditSessionDialog';

interface SessionModalProps {
  id: number;
  onClose: () => void;
}

export default function SessionModal({ id, onClose }: SessionModalProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'retrospection'>(
    'activity',
  );

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const { data: sessionData, isLoading } = useQuery({
    queryKey: ['session', id],
    queryFn: () => getSession(id),
  });

  if (isLoading) return null;

  return (
    <div
      className="absolute left-0 top-0 z-10 h-full w-full"
      onClick={handleBackgroundClick}
    >
      <div className="absolute right-0 top-0 z-50 flex h-screen w-[70vw] flex-col rounded-l-3xl bg-white px-8 py-12 shadow-[-1px_0_10px_1px_rgba(0,0,0,0.3)]">
        <img
          src={CloseGrayIcon}
          alt="close"
          className="h-6 w-6 cursor-pointer self-end"
          onClick={onClose}
        />

        <h1 className="mt-[18px] font-nanum text-[24px] font-extrabold text-[#333335]">
          {sessionData.title}
        </h1>
        <span className="text[14px] mt-[10px] text-[#868687]">
          {sessionData.startAt}
        </span>

        <div className="mt-[2px] flex gap-4 self-end">
          {activeTab === 'activity' ? (
            <>
              <EditSessionDialog data={sessionData} />
              <SessionDeleteDialog id={id} onClose={onClose}>
                <Button className="border border-[#BEBEBF] bg-white px-5 py-[9px] text-black hover:bg-[#BEBEBF]">
                  삭제
                </Button>
              </SessionDeleteDialog>
            </>
          ) : (
            <>
              <RetrospectionDialog id={id} data={sessionData.retrospect} />
              <RetrospectionDeleteDialog id={id}>
                <Button className="border border-[#BEBEBF] bg-white px-5 py-[9px] text-[#BEBEBF] hover:bg-[#BEBEBF] hover:text-white">
                  삭제
                </Button>
              </RetrospectionDeleteDialog>
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
            <div className="flex gap-3 w-full overflow-x-auto">
              {sessionData.images.map((image: string) => (
                <img
                  key={image}
                  src={image}
                  alt="session"
                  className="h-[227px] w-1/3 bg-[#BEBEBF] object-contain"
                />
              ))}
            </div>

            <div className="mt-[34px] text-black">
              {sessionData.content
                .split('\n')
                .map((line: string, index: number) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </div>
          </div>
        ) : (
          <div>
            <div
              className={cn(
                'mt-[38px] text-[#BEBEBF]',
                sessionData.retrospect.length > 0 && 'text-black',
              )}
            >
              {sessionData.retrospect && sessionData.retrospect.length > 0
                ? sessionData.retrospect
                  .split('\n')
                  .map((line: string, index: number) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                : '내용이 없습니다.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
