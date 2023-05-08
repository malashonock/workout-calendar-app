import { FunctionComponent } from 'react';
import { IconButton, Avatar } from '@mui/material';

import { useAuth } from 'features/auth/hooks';
import { getInitials } from 'common/utils';

interface UserAccountButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const UserAccountButton: FunctionComponent<UserAccountButtonProps> = ({
  onClick,
}) => {
  const { loggedUser } = useAuth();

  const initials: string | null = loggedUser
    ? getInitials(loggedUser.name)
    : null;

  return (
    <IconButton onClick={onClick}>
      <Avatar>{initials}</Avatar>
    </IconButton>
  );
};
