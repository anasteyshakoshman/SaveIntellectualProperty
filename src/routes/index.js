import React from 'react';
import loadable from '@loadable/component';

const MainPage = loadable(() => import('../containers/Main'));
const ProfilePage = loadable(() => import('../containers/Profile'));
const NotFoundPage = loadable(() => import('../pages/NotFound/NotFound'));

export const routes = [
    {
        path: '/',
        element: <MainPage />
    }, {
        path: '/profile',
        element: <ProfilePage />
    }, {
        path: '/*',
        exact: false,
        element: <NotFoundPage />
    }
];
