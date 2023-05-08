import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { MenuItem, ListItemIcon } from '@mui/material';

import styles from './UserMenuItem.module.scss';
import { Link } from 'react-router-dom';
import { ConditionalWrapper } from 'common/components';

interface UserMenuItemProps extends PropsWithChildren {
  icon: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  href?: string;
}

export const UserMenuItem: FunctionComponent<UserMenuItemProps> = ({
  icon,
  onClick,
  href,
  children,
}) => {
  return (
    <ConditionalWrapper
      condition={Boolean(href)}
      wrapper={Link}
      wrapperProps={{
        to: href,
        className: styles.link,
      }}
    >
      <MenuItem onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        {children}
      </MenuItem>
    </ConditionalWrapper>
  );
};
