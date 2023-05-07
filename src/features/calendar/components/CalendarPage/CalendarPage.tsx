import { FunctionComponent, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import {
  useParams,
  useNavigate,
  LoaderFunction,
  useLoaderData,
} from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { CalendarDay } from '..';
import { DayResult } from '../../types';

import styles from './CalendarPage.module.scss';
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

export const CalendarPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const monthResults = useLoaderData() as DayResult[];

  const { yearMonth } = useParams();
  const [currentMonth, setCurrentMonth] = useState<Dayjs | undefined>(
    dayjs(yearMonth),
  );
  useEffect(() => {
    if (yearMonth) {
      setCurrentMonth(dayjs(yearMonth));
    }
  }, [yearMonth]);

  const handleMonthChange = (newMonth: Dayjs) => {
    navigate(`/calendar/${newMonth.format('YYYY-MM')}`);
  };

  return (
    <Paper className={styles.wrapper}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          views={['day']}
          dayOfWeekFormatter={(day: string): string => day}
          showDaysOutsideCurrentMonth
          defaultCalendarMonth={currentMonth}
          onMonthChange={handleMonthChange}
          slots={
            {
              day: CalendarDay,
            } as any
          }
          slotProps={{
            day: {
              monthResults,
            } as any,
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
};
