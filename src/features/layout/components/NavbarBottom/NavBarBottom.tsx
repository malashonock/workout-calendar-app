import { FunctionComponent } from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';

import { NavTabs, NavTabsVariant } from '..';
import { useScreenWidth } from '../../hooks';

import styles from './NavbarBottom.module.scss';
import { useActiveTab } from '../../hooks';

export const NavbarBottom: FunctionComponent = () => {
  const { isMobileScreen } = useScreenWidth();

  const activeTabIndex = useActiveTab();
  const show = activeTabIndex > -1;

  return show && isMobileScreen ? (
    <AppBar position="sticky" className={styles.wrapper}>
      <Container maxWidth="lg">
        <Toolbar className={styles.content}>
          <NavTabs variant={NavTabsVariant.Bottom} />
        </Toolbar>
      </Container>
    </AppBar>
  ) : null;
};
