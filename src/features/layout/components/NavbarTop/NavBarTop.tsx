import { FunctionComponent } from 'react';
import { AppBar, Box, Container, Toolbar } from '@mui/material';

import { Logo, NavTabs, NavTabsVariant } from '..';
import { UserMenu } from 'features/auth/components';
import { useScreenWidth, useActiveTab } from '../../hooks';

import styles from './NavbarTop.module.scss';

export const NavbarTop: FunctionComponent = () => {
  const { isMobileScreen } = useScreenWidth();

  const activeTabIndex = useActiveTab();
  const showTabs = activeTabIndex > -1;

  return (
    <AppBar position="sticky" className={styles.wrapper}>
      <Container maxWidth="lg">
        <Toolbar className={styles.content}>
          <Box className={styles.logo}>
            <Logo />
          </Box>
          {showTabs && !isMobileScreen && (
            <NavTabs variant={NavTabsVariant.Top} />
          )}
          <Box className={styles.userAccountBtn}>
            <UserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
