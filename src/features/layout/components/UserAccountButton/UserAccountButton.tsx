import { FunctionComponent } from 'react';
import { IconButton, Avatar } from '@mui/material';

import styles from './UserAccountButton.module.scss';

export const UserAccountButton: FunctionComponent = () => {
  return (
    <IconButton>
      <Avatar />
    </IconButton>
  );
};
