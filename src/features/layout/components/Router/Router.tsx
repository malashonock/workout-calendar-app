import { FunctionComponent } from 'react';
import {
  Route,
  RouterProvider,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Typography } from '@mui/material';

import { Layout } from '..';

const routes: JSX.Element = (
  <Route path="/" element={<Layout />}>
    <Route index element={<Navigate to="/calendar" />} />
    <Route path="calendar" element={<Typography>Calendar page</Typography>} />
    <Route path="tracker" element={<Typography>Tracker page</Typography>} />
    <Route path="stats" element={<Typography>Stats page</Typography>} />
    <Route path="404" element={<Typography>Page not found</Typography>} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));

export const Router: FunctionComponent = () => {
  return <RouterProvider router={router} />;
};
