import { FunctionComponent, useState } from 'react';
import { Menu } from '@mui/material';

import { UserMenuItemConfig, userMenuConfig } from './userMenuConfig';
import { UserAccountButton, UserMenuItem } from '..';
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
        {userMenuConfig
          .filter(({ isPrivate }: UserMenuItemConfig): boolean => {
            return isPrivate === Boolean(token);
          })
          .map(
            ({ label, icon, href }: UserMenuItemConfig): JSX.Element => (
              <UserMenuItem key="label" icon={icon} href={href}>
                {label}
              </UserMenuItem>
            ),
          )}
      </Menu>
    </>
  );
};