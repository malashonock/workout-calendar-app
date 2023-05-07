import { FunctionComponent, useCallback, useState } from 'react';
import { AppBar, Box, Container, Toolbar } from '@mui/material';

import { Logo, NavTabs, NavTabsVariant, UserAccountButton } from '..';
import { useScreenWidth } from '../../hooks';

import styles from './NavbarTop.module.scss';

export const NavbarTop: FunctionComponent = () => {
  const [showTabs, setShowTabs] = useState(true);
  const { isMobileScreen } = useScreenWidth();

  const onTabSelectionLost = useCallback(
    (selectionLost: boolean) => {
      setShowTabs(!selectionLost);
    },
    [setShowTabs],
  );

  return (
    <AppBar position="static" className={styles.wrapper}>
      <Container maxWidth="lg">
        <Toolbar className={styles.content}>
          <Box className={styles.logo}>
            <Logo />
          </Box>
          {showTabs && !isMobileScreen && (
            <NavTabs
              variant={NavTabsVariant.Top}
              onSelectionLost={onTabSelectionLost}
            />
          )}
          <Box className={styles.userAccountBtn}>
            <UserAccountButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
