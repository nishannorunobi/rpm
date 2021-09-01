import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { to: '/dashboard' },
  },
  {
    title: 'Auth',
    icon: { name: 'lock-outline' },
    children: [
      {
        title: 'Login',
        link: { to: '/auth/login' },
      },
      {
        title: 'Register',
        link: { to: '/auth/register' },
      },
      {
        title: 'Request Password',
        link: { to: '/auth/request-password' },
      },
      {
        title: 'Reset Password',
        link: { to: '/auth/reset-password' },
      },
    ],
  },
];

export default items;
