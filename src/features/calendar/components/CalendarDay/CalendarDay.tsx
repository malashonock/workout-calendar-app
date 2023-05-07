import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import cn from 'classnames';

import { DayResult, DayStatus } from '../../types';

import styles from './CalendarDay.module.scss';

interface CalendarDayProps extends PickersDayProps<Dayjs> {
  monthResults: DayResult[];
}

export const CalendarDay: FunctionComponent<CalendarDayProps> = ({
  day,
  monthResults,
  ...otherProps
}) => {
  const dayResult = monthResults.find(
    ({ date }: DayResult): boolean => date === day.format('YYYY-MM-DD'),
  );

  const isToDo = dayResult?.status === DayStatus.ToDo;
  const isDone = dayResult?.status === DayStatus.Done;
  const isMissed = dayResult?.status === DayStatus.Missed;

  const tooltipTitle = ((): string | undefined => {
    if (isToDo) return 'You have a workout scheduled on this day';
    if (isDone)
      return 'Well done! You did all scheduled excercises for this day';
    if (isMissed) return "You missed your workout, don't give up!";
  })();

  return (
    <Link to={`/tracker/${day.format('YYYY-MM-DD')}`}>
      <PickersDay
        day={day}
        {...otherProps}
        title={tooltipTitle}
        className={cn(
          styles.day,
          { [styles.done]: isDone },
          { [styles.missed]: isMissed },
          { [styles.todo]: isToDo },
        )}
      />
    </Link>
  );
};
