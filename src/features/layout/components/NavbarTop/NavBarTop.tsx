import { FunctionComponent } from 'react';
import { Box, Toolbar } from '@mui/material';

import { Logo, NavTabs, NavTabsVariant, UserAccountButton } from '..';
import { useScreenWidth } from '../../hooks';

import styles from './NavbarTop.module.scss';

export const NavbarTop: FunctionComponent = () => {
  const { isMobileScreen } = useScreenWidth();

  return (
    <Toolbar className={styles.wrapper}>
      <Box className={styles.logo}>
        <Logo />
      </Box>
      {!isMobileScreen && <NavTabs variant={NavTabsVariant.Top} />}
      <Box className={styles.userAccountBtn}>
        <UserAccountButton />
      </Box>
    </Toolbar>
  );
};
