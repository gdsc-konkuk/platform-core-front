import { Outlet } from 'react-router-dom';
import NavMenu from './NavMenu';

export default function MainLayout() {
  return (
    <div className="relative flex h-full w-full justify-end font-pretendard">
      <NavMenu />
      <div className="z-0 w-[290px] opacity-0"></div>
      <div className="z-20 h-full w-full rounded-l-3xl bg-white px-[84px] py-[78px]">
        <Outlet />
      </div>
    </div>
  );
}
