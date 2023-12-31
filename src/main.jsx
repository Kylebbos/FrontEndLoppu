import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './home';
import Error from './Error';
import Training from './training';
import Customer from './customer';
import Calendar from './Calendar';
import Statistic from './Statistic';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: 'training',
        element: <Training />,
      },
      {
        path: 'customer',
        element: <Customer />,
      },
      {
        path: 'calendar', 
        element: <Calendar />,
      },
      {
        path: 'statistic', 
        element: <Statistic />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
