import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import styles from './Logo.module.scss';
import logoImagePath from 'assets/images/logo.png';

export const Logo: FunctionComponent = () => {
  return (
    <Link to="/" className={styles.link}>
      <Stack direction="row" gap={1}>
        <img src={logoImagePath} alt="logo" height="40" width="40" />
        <Typography className={styles.text}>
          Workout
          <br />
          Calendar
        </Typography>
      </Stack>
    </Link>
  );
};
