import { FunctionComponent, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import cn from 'classnames';

import { useScreenWidth } from '../../hooks';

import styles from './NavTabs.module.scss';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistIcon from '@mui/icons-material/Checklist';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

interface TabConfig {
  to: string;
  label: string;
  icon: JSX.Element;
}

const tabs: TabConfig[] = [
  {
    to: '/calendar',
    label: 'Calendar',
    icon: <CalendarMonthIcon />,
  },
  {
    to: '/tracker',
    label: 'Tracker',
    icon: <ChecklistIcon />,
  },
  {
    to: '/stats',
    label: 'Stats',
    icon: <QueryStatsIcon />,
  },
];

export enum NavTabsVariant {
  Top = 'top',
  Bottom = 'bottom',
}

interface NavTabsProps {
  variant: NavTabsVariant;
}

export const NavTabs: FunctionComponent<NavTabsProps> = ({
  variant,
}: NavTabsProps) => {
  const { pathname } = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    setActiveTabIndex(
      tabs.findIndex(({ to }: TabConfig): boolean => pathname.startsWith(to)),
    );
  }, [pathname]);

  const { isWideScreen } = useScreenWidth();

  const handleTabIndexChange = (
    event: React.SyntheticEvent,
    newTabIndex: number,
  ) => {
    setActiveTabIndex(newTabIndex);
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
      {tabs.map(
        ({ to, label, icon }: TabConfig): JSX.Element => (
          <Tab
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
};
