import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from '../utils';
import RootPage from '../pages';
import { HomePage } from '../pages/HomePage';
import { CampaignsPage } from '../campaigns';
import { ErrorPage } from '../pages/ErrorPage';

const routes = [
  {
    path: ROUTES.INDEX,
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.INDEX,
        element: <HomePage />,
      },
      {
        path: ROUTES.CAMPAIGNS,
        element: <CampaignsPage />,
      },
    ],
  },
];

const Router: React.FunctionComponent = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
