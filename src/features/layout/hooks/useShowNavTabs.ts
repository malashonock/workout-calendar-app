import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TabConfig, tabsConfig } from '../components/NavTabs';

export const useShowNavTabs = (): boolean => {
  const { pathname } = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    const newTabIndex = tabsConfig.findIndex(({ to }: TabConfig): boolean =>
      pathname.startsWith(to),
    );

    setActiveTabIndex(newTabIndex);
  }, [pathname]);

  return activeTabIndex > -1;
};
