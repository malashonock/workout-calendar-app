import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Stack, Container } from '@mui/material';

import { NavbarBottom, NavbarTop } from '..';

import styles from './Layout.module.scss';

export const Layout: FunctionComponent = () => {
  return (
    <Stack className={styles.wrapper}>
      <NavbarTop />
      <Box className={styles.main}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
      <NavbarBottom />
    </Stack>
  );
};
