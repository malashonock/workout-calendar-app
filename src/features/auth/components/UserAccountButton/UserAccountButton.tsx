import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { IconButton, Avatar } from '@mui/material';

import { getInitials } from 'common/utils';
import { selectLoggedUser } from 'common/store';

interface UserAccountButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const UserAccountButton: FunctionComponent<UserAccountButtonProps> = ({
  onClick,
}) => {
  const loggedUser = useSelector(selectLoggedUser);

  const initials: string | null = loggedUser
    ? getInitials(loggedUser.name)
    : null;

  return (
    <IconButton onClick={onClick}>
      <Avatar>{initials}</Avatar>
    </IconButton>
  );
};
