import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import App from './App';

import HomePage from '@/pages/home';
import MyPage from '@/pages/my-page';
import YourPage from '@/pages/your-page';
import MagazinePage from '@/pages/magazine';
import MagazineDetailPage from '@/pages/magazine/detail';
import MagazineWritePage from '@/pages/magazine/write';
import ProfilePage from '@/pages/profile';
import NotFoundPage from '@/pages/not-found';
import RankPage from '@/pages/rank';
import SubScribe from '@/pages/subscribe';

import { ROOT_PATH } from '@/temp/global-variables';

const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <Navigate to="my-page" />,
        index: true,
      },
      {
        path: 'my-page',
        element: <MyPage />,
      },
      {
        path: 'my-page/:id',
        element: <YourPage />,
      },
      {
        path: 'magazine',
        element: <MagazinePage />,
      },
      {
        path: 'magazine/:id',
        element: <MagazineDetailPage />,
      },
      {
        path: 'magazine/write',
        element: <MagazineWritePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'rank',
        element: <RankPage />,
      },
      {
        path: 'subscribe',
        element: <SubScribe />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
