import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Stack, AppBar, Container } from '@mui/material';

import { NavbarBottom, NavbarTop } from '..';
import { useScreenWidth } from '../../hooks';

import styles from './Layout.module.scss';

export const Layout: FunctionComponent = () => {
  const { isMobileScreen } = useScreenWidth();

  return (
    <Stack className={styles.wrapper}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <NavbarTop />
        </Container>
      </AppBar>
      <Box className={styles.main}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
      {isMobileScreen && (
        <AppBar position="static" className={styles.navbarBottom}>
          <Container maxWidth="lg">
            <NavbarBottom />
          </Container>
        </AppBar>
      )}
    </Stack>
  );
};
