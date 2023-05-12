import { FunctionComponent } from 'react';
import {
  Route,
  RouterProvider,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

import { Layout } from '..';
import { CalendarPage, calendarLoader } from 'features/calendar/pages';
import { TrackerPage, exerciseLoader } from 'features/tracker/pages';
import { StatsPage } from 'features/stats/pages';
import { LoginPage, SignupPage } from 'features/auth/pages';
import { Logout, ProtectedRoute } from 'features/auth/components';
import { selectAuthToken } from 'common/store';
import { WeatherForecastProvider } from 'features/tracker/components';
import { ExerciseTypesProvider } from 'common/components';
import { RedirectCondition } from 'features/auth/types';

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
    <Route element={<ExerciseTypesProvider />}>
      <Route element={<WeatherForecastProvider />}>
        <Route path="tracker">
          <Route
            index
            element={
              <Navigate
                to={`/tracker/${dayjs(new Date()).format('YYYY-MM-DD')}`}
              />
            }
          />
          <Route
            path=":date"
            element={
              <ProtectedRoute redirectIf={RedirectCondition.Unauthenticated}>
                <TrackerPage />
              </ProtectedRoute>
            }
            loader={exerciseLoader(authToken)}
          />
        </Route>
      </Route>
      <Route
        path="stats"
        element={
          <ProtectedRoute redirectIf={RedirectCondition.Unauthenticated}>
            <StatsPage />
          </ProtectedRoute>
        }
      />
    </Route>
    <Route path="auth">
      <Route
        path="signup"
        element={
          <ProtectedRoute redirectIf={RedirectCondition.Authenticated}>
            <SignupPage />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="userprofile"
        element={<Typography>User profile page</Typography>}
      /> */}
      <Route
        path="login"
        element={
          <ProtectedRoute redirectIf={RedirectCondition.Authenticated}>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="logout"
        element={
          <ProtectedRoute redirectIf={RedirectCondition.Unauthenticated}>
            <Logout />
          </ProtectedRoute>
        }
      />
    </Route>
    <Route path="404" element={<Typography>Page not found</Typography>} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Route>
);

const router = (authToken?: string) =>
  createBrowserRouter(createRoutesFromElements(routes(authToken)));

export const Router: FunctionComponent = () => {
  const token = useSelector(selectAuthToken);

  return <RouterProvider router={router(token)} />;
};
