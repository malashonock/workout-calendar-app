import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import cn from 'classnames';

import { DayResult, DayStatus } from '../../types';

import styles from './CalendarDay.module.scss';
import { ConditionalTooltip } from 'common/components';

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
  const isFailed = dayResult?.status === DayStatus.Failed;

  const showTooltip = isToDo || isDone || isFailed;
  const tooltipTitle = ((): string | undefined => {
    if (isToDo) return 'You have a workout scheduled on this day';
    if (isDone)
      return 'Well done! You performed all scheduled excercises for this day';
    if (isFailed) return "You missed your workout, don't give up!";
  })();

  return (
    <Link to={`/tracker/${day.format('YYYY-MM-DD')}`}>
      <ConditionalTooltip
        showIf={showTooltip}
        title={tooltipTitle}
        arrow
        disableInteractive
        disableFocusListener
      >
        <PickersDay
          day={day}
          {...otherProps}
          className={cn(
            styles.day,
            { [styles.done]: isDone },
            { [styles.failed]: isFailed },
            { [styles.todo]: isToDo },
          )}
        />
      </ConditionalTooltip>
    </Link>
  );
};
