// import { Home, Settings, Trash } from 'lucide-react';

import { Theme } from './types';

export const data = {
    user: {
        name: 'daksh',
        email: 'example@gmail.com',
        avatar: '/',
    },

    navMenu: [
        {
            title: 'Home',
            url: '/dashboard',
            // icon: Home,
            isActive: false,
        },
        {
            title: 'Templates',
            url: '/templates',
            // icon: Home,
            isActive: false,
        },
        {
            title: 'Trash',
            url: '/trash',
            // icon: Trash,
            isActive: false,
        },
        {
            title: 'Settings',
            url: '/settings',
            // icon: Settings,
            isActive: false,
        },
    ],
};

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

export const themes: Theme[] = [
    {
        name: 'Default',
        fontFamily: "'Inter', sans-serif",
        fontColor: '#000',
        backgroundColor: '#f0f0f0',
        slideBackgroundColor: '#fff',
        accentColor: '#3b82f6',
        navbarColor: '#fff',
        sidebarColor: '#f0f0f0',
        type: 'light',
    },
];
