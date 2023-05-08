import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { TabConfig, tabsConfig } from '../components/NavTabs';

export const useActiveTab = (
  effect?: (activeTabIndex: number) => void,
): number => {
  const { pathname } = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    const newTabIndex = tabsConfig.findIndex(({ to }: TabConfig): boolean =>
      pathname.startsWith(to),
    );

    setActiveTabIndex(newTabIndex);
    effect?.call(null, activeTabIndex);
  }, [pathname, effect]);

  return activeTabIndex;
};
