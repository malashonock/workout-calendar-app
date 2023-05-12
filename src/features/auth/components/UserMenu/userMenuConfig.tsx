import { AccountCircle, Logout, Login, PersonAdd } from '@mui/icons-material';

export interface UserMenuItemConfig {
  label: string;
  icon: JSX.Element;
  href: string;
  isPrivate: boolean;
}

export const userMenuConfig: UserMenuItemConfig[] = [
  // {
  //   label: 'User profile',
  //   icon: <AccountCircle fontSize="small" />,
  //   href: '/auth/userprofile',
  //   isPrivate: true,
  // },
  {
    label: 'Log out',
    icon: <Logout fontSize="small" />,
    href: '/auth/logout',
    isPrivate: true,
  },
  {
    label: 'Log in',
    icon: <Login fontSize="small" />,
    href: '/auth/login',
    isPrivate: false,
  },
  {
    label: 'Sign up',
    icon: <PersonAdd fontSize="small" />,
    href: '/auth/signup',
    isPrivate: false,
  },
];
