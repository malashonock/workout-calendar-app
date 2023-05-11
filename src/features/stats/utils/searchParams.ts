import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { PeriodSettings } from '../types';
import { TimeScale } from 'common/types';

dayjs.extend(weekOfYear);

export const parseSearchParams = (
  searchParams: URLSearchParams,
): PeriodSettings | null => {
  const year = Number(searchParams.get('year')) || null;
  const month = Number(searchParams.get('month')) - 1 || null;
  const week = Number(searchParams.get('week')) || null;

  if (!year) {
    // Search params are invalid
    return null;
  }

  return week
    ? {
        timeScale: TimeScale.Week,
        startDate: dayjs().year(year).week(week).startOf('week').toDate(),
      }
    : month
    ? {
        timeScale: TimeScale.Month,
        startDate: dayjs().year(year).month(month).startOf('month').toDate(),
      }
    : {
        timeScale: TimeScale.Year,
        startDate: dayjs().year(year).startOf('year').toDate(),
      };
};

export const buildSearchParams = (
  periodSettings: PeriodSettings,
): URLSearchParams => {
  const { timeScale, startDate } = periodSettings;

  const year = dayjs(startDate).year();

  let month: number | null = null;
  let week: number | null = null;

  switch (timeScale) {
    case TimeScale.Week:
      week = dayjs(startDate).week();
      break;
    case TimeScale.Month:
      month = dayjs(startDate).month() + 1;
      break;
    default:
      break;
  }

  const searchParams = new URLSearchParams({
    year: year.toString(),
  });

  if (month) searchParams.set('month', month.toString());
  if (week) searchParams.set('week', week.toString());

  return searchParams;
};
