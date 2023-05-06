import { FunctionComponent } from 'react';
import { Stack, Typography } from '@mui/material';

import styles from './Logo.module.scss';
import logoImagePath from 'assets/images/logo.png';

export const Logo: FunctionComponent = () => {
  return (
    <Stack direction="row" gap={1}>
      <img src={logoImagePath} alt="logo image" height="32" width="32" />
      <Typography className={styles.text}>
        Workout
        <br />
        Calendar
      </Typography>
    </Stack>
  );
};
