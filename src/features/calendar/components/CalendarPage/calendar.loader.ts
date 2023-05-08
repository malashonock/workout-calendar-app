import { DayResult } from 'features/calendar/types';
import { LoaderFunction } from 'react-router-dom';
import { CalendarService } from '../services';

export const calendarLoader: LoaderFunction = async ({
  params,
}): Promise<DayResult[]> => {
  const { yearMonth } = params;

  if (!yearMonth) {
    throw new Error('No year/month provided');
  }

  const [year, month] = yearMonth
    .split('-')
    .map((segment: string): number => Number(segment));

  if (!year || !month) {
    throw new Error('Invalid year/month');
  }

  return await CalendarService.getMonthResults(year, month);
};
