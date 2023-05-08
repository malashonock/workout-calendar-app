import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import cn from 'classnames';

import { DayStatus } from '../../types';

import styles from './CalendarDay.module.scss';
import { CalendarStatsDto } from 'common/model/dto';

interface CalendarDayProps extends PickersDayProps<Dayjs> {
  monthResults: CalendarStatsDto;
}

export const CalendarDay: FunctionComponent<CalendarDayProps> = ({
  day,
  monthResults,
  ...otherProps
}) => {
  const dayStatus = monthResults[day.format('YYYY-MM-DD')];

  const isToDo = dayStatus === DayStatus.ToDo;
  const isDone = dayStatus === DayStatus.Done;
  const isMissed = dayStatus === DayStatus.Missed;

  const tooltipTitle = ((): string | undefined => {
    if (isToDo) return 'You have a workout scheduled on this day';
    if (isDone)
      return 'Well done! You did all scheduled exercises for this day';
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
