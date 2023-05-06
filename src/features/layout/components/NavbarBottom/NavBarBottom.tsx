import { FunctionComponent } from 'react';
import { Toolbar } from '@mui/material';

import { NavTabs, NavTabsVariant } from '..';
import { useScreenWidth } from '../../hooks';

import styles from './NavbarBottom.module.scss';

export const NavbarBottom: FunctionComponent = () => {
  const { isMobileScreen } = useScreenWidth();

  return (
    <Toolbar className={styles.wrapper}>
      {isMobileScreen && <NavTabs variant={NavTabsVariant.Bottom} />}
    </Toolbar>
  );
};
