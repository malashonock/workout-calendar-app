import { FunctionComponent } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { TimeScale } from 'common/types';

import styles from './PeriodSelector.module.scss';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { PeriodSettings } from 'features/stats/types';

dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

export interface PeriodSelectorProps extends PeriodSettings {
  onChange: (newDate: Date) => void;
}

export const PeriodSelector: FunctionComponent<PeriodSelectorProps> = ({
  timeScale,
  startDate,
  onChange,
}) => {
  const dateFormat = (() => {
    switch (timeScale) {
      case TimeScale.Day:
      default:
        return 'ddd, MMMM D, YYYY';
      case TimeScale.Week:
        return '[Week] w, YYYY';
      case TimeScale.Month:
        return 'MMMM YYYY';
      case TimeScale.Year:
        return 'YYYY';
    }
  })();

  const handlePrev = () => {
    const prevStartDate: Date = dayjs(startDate).add(-1, timeScale).toDate();
    onChange(prevStartDate);
  };

  const handleNext = () => {
    const nextStartDate: Date = dayjs(startDate).add(+1, timeScale).toDate();
    onChange(nextStartDate);
  };

  return (
    <Box className={styles.wrapper}>
      <IconButton onClick={handlePrev}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Typography className={styles.date}>
        {dayjs(startDate).startOf(timeScale).format(dateFormat)}
      </Typography>
      <IconButton onClick={handleNext}>
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
};
