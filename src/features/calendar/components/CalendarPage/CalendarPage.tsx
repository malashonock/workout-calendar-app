import { FunctionComponent, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { CalendarDay } from '..';
import { CalendarStatsDto } from 'common/model/dto';

import styles from './CalendarPage.module.scss';

export const CalendarPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const monthResults = useLoaderData() as CalendarStatsDto;

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
