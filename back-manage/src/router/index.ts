import { createBrowserRouter, type RouteObject, Navigate } from 'react-router';
import { createElement } from 'react';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import LayoutIndex from '@/layout';
import List from '@/pages/Manage/List';
import Star from '@/pages/Manage/Star';
import Trash from '@/pages/Manage/Trash';
import Edit from '@/pages/Question/Edit';
import Stat from '@/pages/Question/Stat';
import Page404 from '@/pages/Result/Page404';
import Page403 from '@/pages/Result/Page403';
import AuthLoader from './AuthLoader';
import Manage from '@/layout/Manage';
import Question from '@/layout/Question';

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        id: 'layout',
        Component: LayoutIndex,
        loader: AuthLoader,
        children: [
          {
            Component: Manage,
            children: [
              {
                path: 'manage',
                children: [
                  {
                    path: 'list',
                    Component: List,
                  },
                  {
                    path: 'star',
                    Component: Star,
                  },
                  {
                    path: 'trash',
                    Component: Trash,
                  },
                ],
              },
            ],
          },
          {
            Component: Question,
            children: [
              {
                path: 'question',
                children: [
                  {
                    path: 'edit/:id',
                    Component: Edit,
                  },
                  {
                    path: 'stat/:id',
                    Component: Stat,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '404',
    Component: Page404,
  },
  {
    path: '403',
    Component: Page403,
  },
  {
    path: '*',
    Component: () => createElement(Navigate, { to: '/404', replace: true }),
  },
];

export default createBrowserRouter(routes);
