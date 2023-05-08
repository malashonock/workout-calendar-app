import { DayStatus } from 'features/calendar/types';
import { DateString } from 'common/utils';

export type CalendarStatsDto = {
  [date in DateString]: DayStatus;
};
