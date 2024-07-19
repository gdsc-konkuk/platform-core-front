import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="font-pretendard">
      <h1>Main Layout</h1>
      <Outlet />
    </div>
  );
}
