import Attendance from '@/features/attendance/components/Attendance';
import Login from '@/features/login/components/Login';
import MainLayout from '@/features/main-layout/components/MainLayout';
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
        element: <Attendance />,
      },
      {
        path: 'status',
        element: <h1>Status</h1>,
      },
      {
        path: 'mail',
        element: <h1>Mail</h1>,
      },
      {
        path: 'session',
        element: <h1>Session</h1>,
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