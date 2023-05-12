import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Grid, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import weekDay from 'dayjs/plugin/weekday';

import { ExerciseStatsCard, TimeScaleSelector } from '../../components';
import { PeriodSelector } from 'common/components';
import { TimeScale } from 'common/types';
import { PeriodSettings } from '../../types';
import { buildSearchParams, parseSearchParams } from '../../utils';
import { useExerciseStats } from '../../hooks';
import { ExerciseStatsDto } from 'common/model/dto';

import styles from './StatsPage.module.scss';

dayjs.extend(weekDay);

export const StatsPage: FunctionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [periodSettings, setPeriodSettings] = useState<PeriodSettings>(
    parseSearchParams(searchParams) || {
      timeScale: TimeScale.Week,
      startDate: dayjs().weekday(0).toDate(),
    },
  );

  const { timeScale, startDate } = periodSettings;

  // Sync search params with settings update
  useEffect(() => {
    setSearchParams(buildSearchParams(periodSettings));
  }, [periodSettings]);

  const handleScaleChange = (newTimeScale: TimeScale): void => {
    const newStartDate: Date = dayjs(startDate).startOf(newTimeScale).toDate();

    setPeriodSettings({
      timeScale: newTimeScale,
      startDate: newStartDate,
    });
  };

  const exerciseStats = useExerciseStats(timeScale, startDate);

  const handlePeriodChange = (newStartDate: Date): void => {
    setPeriodSettings({
      timeScale,
      startDate: newStartDate,
    });
  };

  return (
    <Paper className={styles.wrapper}>
      <TimeScaleSelector {...periodSettings} onChange={handleScaleChange} />
      <PeriodSelector {...periodSettings} onChange={handlePeriodChange} />
      {exerciseStats.length > 0 ? (
        <Box className={styles.cards}>
          {exerciseStats.map(
            (exerciseStat: ExerciseStatsDto): JSX.Element | null =>
              exerciseStat.totalEffort ? (
                <ExerciseStatsCard
                  key={exerciseStat.exerciseType.id}
                  stats={exerciseStat}
                />
              ) : null,
          )}
        </Box>
      ) : (
        <Typography className={styles.placeholder} color="text.secondary">
          No data to display
        </Typography>
      )}
    </Paper>
  );
};
