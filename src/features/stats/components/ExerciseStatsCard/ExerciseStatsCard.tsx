import { CSSProperties, FunctionComponent } from 'react';
import { Box, Card, Typography } from '@mui/material';

import { ExerciseStatsDto } from 'common/model/dto';
import { DonutChart } from '../DonutChart';
import { LineChart } from '../LineChart';

import styles from './ExerciseStatsCard.module.scss';
import { TimeScale } from 'common/types';

interface ExerciseStatsCardProps {
  stats: ExerciseStatsDto;
}

export const ExerciseStatsCard: FunctionComponent<ExerciseStatsCardProps> = ({
  stats,
}) => {
  const {
    timeScale,
    exerciseType,
    totalEffort,
    effortChange,
    breakdownByStatus,
    breakdownBySubperiod,
  } = stats;

  const subperiodFieldName = (() => {
    switch (timeScale) {
      case TimeScale.Year:
        return 'month';
      case TimeScale.Month:
        return 'day';
      case TimeScale.Week:
      default:
        return 'dayOfWeek';
    }
  })();

  return (
    <Card className={styles.wrapper} elevation={4}>
      <Box className={styles.header}>
        <div
          className={styles.marker}
          style={{ '--marker-color': exerciseType.color } as CSSProperties}
        />
        <Typography className={styles.exerciseType}>
          {exerciseType.name}
        </Typography>
      </Box>
      <Box className={styles.charts}>
        <Box className={styles.totalChart}>
          {breakdownByStatus && breakdownByStatus.length > 0 ? (
            <DonutChart
              data={breakdownByStatus}
              totalEffort={totalEffort}
              unitOfEffort={exerciseType.unitOfEffort}
            />
          ) : (
            <Typography className={styles.placeholder} color="text.secondary">
              No data to display
            </Typography>
          )}
        </Box>
        <Box className={styles.breakDownChart}>
          {breakdownBySubperiod && breakdownBySubperiod.length > 0 ? (
            <LineChart
              data={breakdownBySubperiod}
              color={exerciseType.color}
              periodFieldName={subperiodFieldName}
            />
          ) : (
            <Typography className={styles.placeholder} color="text.secondary">
              No data to display
            </Typography>
          )}
        </Box>
      </Box>
      <Box className={styles.footer}>
        {effortChange !== undefined ? (
          <Typography className={styles.change} color="text.secondary">
            <Typography color="success.main" display="inline" component="span">
              {new Intl.NumberFormat('en-US', {
                signDisplay: 'exceptZero',
                style: 'percent',
              }).format(effortChange)}
            </Typography>{' '}
            than last {timeScale}
          </Typography>
        ) : (
          <Typography className={styles.placeholder} color="text.secondary">
            Data for previous {timeScale} is not available
          </Typography>
        )}
      </Box>
    </Card>
  );
};
