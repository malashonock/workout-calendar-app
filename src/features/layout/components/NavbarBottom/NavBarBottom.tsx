import { FunctionComponent, useCallback, useState } from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';

import { NavTabs, NavTabsVariant } from '..';
import { useScreenWidth } from '../../hooks';

import styles from './NavbarBottom.module.scss';

export const NavbarBottom: FunctionComponent = () => {
  const [show, setShow] = useState(true);
  const { isMobileScreen } = useScreenWidth();

  const onTabSelectionLost = useCallback(
    (selectionLost: boolean) => {
      setShow(!selectionLost);
    },
    [setShow],
  );

  return show && isMobileScreen ? (
    <AppBar position="static" className={styles.wrapper}>
      <Container maxWidth="lg">
        <Toolbar className={styles.content}>
          <NavTabs
            variant={NavTabsVariant.Bottom}
            onSelectionLost={onTabSelectionLost}
          />
        </Toolbar>
      </Container>
    </AppBar>
  ) : null;
};
