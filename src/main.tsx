import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import HomePage from '@/pages/home';
import MyPage from '@/pages/my-page';
import MagazinePage from '@/pages/magazine';
import NotFoundPage from '@/pages/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
        index: true,
      },
      {
        path: 'my-page',
        element: <MyPage />,
      },
      {
        path: 'magazine',
        element: <MagazinePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
