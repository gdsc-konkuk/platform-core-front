import CreateSessionDialog from './create-session-dialog/CreateSessionDialog';
import Sessions from './sessions/Sessions';

export default function SessionManagement() {
  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="font-nanum text-[24px]">세션 운영/관리</h1>
      <CreateSessionDialog />
      <Sessions />
    </div>
  );
}
