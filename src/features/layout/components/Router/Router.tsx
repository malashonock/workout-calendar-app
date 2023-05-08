import { FunctionComponent } from 'react';
import {
  Route,
  RouterProvider,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

import { Layout } from '..';
import { CalendarPage, calendarLoader } from 'features/calendar/components';
import { LoginPage, Logout, SignupPage } from 'features/auth/components';
import { useAuth } from 'features/auth/hooks';

const routes = (authToken?: string): JSX.Element => (
  <Route path="/" element={<Layout />}>
    <Route index element={<Navigate to="/calendar" />} />
    <Route path="calendar">
      <Route
        index
        element={
          <Navigate to={`/calendar/${dayjs(new Date()).format('YYYY-MM')}`} />
        }
      />
      <Route
        path=":yearMonth"
        element={<CalendarPage />}
        loader={calendarLoader(authToken)}
      />
    </Route>
    <Route path="tracker">
      <Route
        index
        element={
          <Navigate to={`/tracker/${dayjs(new Date()).format('YYYY-MM-DD')}`} />
        }
      />
      <Route path=":date" element={<Typography>Tracker page</Typography>} />
    </Route>
    <Route path="auth">
      <Route path="signup" element={<SignupPage />} />
      <Route
        path="userprofile"
        element={<Typography>User profile page</Typography>}
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="logout" element={<Logout />} />
    </Route>
    <Route path="stats" element={<Typography>Stats page</Typography>} />
    <Route path="404" element={<Typography>Page not found</Typography>} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Route>
);

const router = (authToken?: string) =>
  createBrowserRouter(createRoutesFromElements(routes(authToken)));

export const Router: FunctionComponent = () => {
  const { token } = useAuth();

  return <RouterProvider router={router(token)} />;
};
