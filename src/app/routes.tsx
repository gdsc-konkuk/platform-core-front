import Login from '@/features/login/components/Login';
import CreateMail from '@/features/mail-management/components/create-mail/CreateMail';
import MailManagement from '@/features/mail-management/components/MailManagement';
import MainLayout from '@/features/main-layout/components/MainLayout';
import SessionManagement from '@/features/session-management/components/SessionManagement';
import { Navigate, Outlet } from 'react-router-dom';

const routes = (isLoggedIn: boolean) => [
  {
    path: '/app',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/attendance" />,
      },
      {
        path: 'attendance',
        element: <h1>Attendance</h1>,
      },
      {
        path: 'status',
        element: <h1>Status</h1>,
      },
      {
        path: 'mail',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <MailManagement />,
          },
          {
            path: 'create',
            element: <CreateMail />,
          },
        ],
      },
      {
        path: 'session',
        element: <SessionManagement />,
      },
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <Outlet /> : <Navigate to="/app" />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        index: true,
        element: <Navigate to="/login" />,
      },
    ],
  },
];

export default routes;
