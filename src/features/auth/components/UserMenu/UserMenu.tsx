import { FunctionComponent, useState } from 'react';
import { Menu } from '@mui/material';

import { UserAccountButton, UserMenuItem } from '..';

import styles from './UserMenu.module.scss';
import { AccountCircle, Login, Logout, PersonAdd } from '@mui/icons-material';
import { useAuth } from 'features/auth/hooks';

export const UserMenu: FunctionComponent = () => {
  const { token } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <UserAccountButton onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {token
          ? [
              <UserMenuItem
                key="profile"
                icon={<AccountCircle fontSize="small" />}
                href="/user/profile"
              >
                User profile
              </UserMenuItem>,
              <UserMenuItem
                key="logout"
                icon={<Logout fontSize="small" />}
                href="/auth/logout"
              >
                Log out
              </UserMenuItem>,
            ]
          : [
              <UserMenuItem
                key="login"
                icon={<Login fontSize="small" />}
                href="/auth/login"
              >
                Log in
              </UserMenuItem>,
              <UserMenuItem
                key="signup"
                icon={<PersonAdd fontSize="small" />}
                href="/user/register"
              >
                Sign up
              </UserMenuItem>,
            ]}
      </Menu>
    </>
  );
};
