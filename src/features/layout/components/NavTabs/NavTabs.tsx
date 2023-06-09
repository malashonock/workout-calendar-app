import { FunctionComponent, memo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import cn from 'classnames';

import { useActiveTab, useScreenWidth } from '../../hooks';
import { TabConfig, tabsConfig } from './navTabsConfig';

import styles from './NavTabs.module.scss';

export enum NavTabsVariant {
  Top = 'top',
  Bottom = 'bottom',
}

interface NavTabsProps {
  variant: NavTabsVariant;
}

export const NavTabs: FunctionComponent<NavTabsProps> = memo(
  ({ variant }: NavTabsProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const navigate = useNavigate();

    useActiveTab((newTabIndex: number) => setActiveTabIndex(newTabIndex));

    const { isWideScreen } = useScreenWidth();

    const handleTabIndexChange = (
      event: React.SyntheticEvent,
      newTabIndex: number,
    ) => {
      navigate(tabsConfig[newTabIndex].to);
    };

    return (
      <Tabs
        component="nav"
        className={cn(styles.wrapper, styles[variant])}
        value={activeTabIndex}
        onChange={handleTabIndexChange}
        variant={variant === NavTabsVariant.Bottom ? 'fullWidth' : 'standard'}
        centered
      >
        {tabsConfig.map(
          ({ to, label, icon }: TabConfig): JSX.Element => (
            <Tab
              key={to}
              icon={icon}
              iconPosition={isWideScreen ? 'start' : 'top'}
              label={label}
              to={to}
              component={NavLink}
              className={styles.tab}
            />
          ),
        )}
      </Tabs>
    );
  },
);
