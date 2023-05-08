import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistIcon from '@mui/icons-material/Checklist';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

export interface TabConfig {
  to: string;
  label: string;
  icon: JSX.Element;
}

export const tabsConfig: TabConfig[] = [
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
