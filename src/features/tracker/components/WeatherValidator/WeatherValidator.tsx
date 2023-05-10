import { FunctionComponent, useMemo } from 'react';
import { Grid, Alert, Typography } from '@mui/material';

import { useWeatherForecast } from 'features/tracker/hooks';

import styles from './WeatherValidator.module.scss';
import { WeatherService } from 'common/services';
import { WeatherForecastDto } from 'common/model/dto';

interface WeatherValidatorProps {
  date: Date;
}

export const WeatherValidator: FunctionComponent<WeatherValidatorProps> = ({
  date,
}) => {
  const currentWeatherForcast = useWeatherForecast();

  const weatherCheckResult: WeatherForecastDto | null = useMemo(() => {
    if (!currentWeatherForcast) {
      return null;
    }

    return WeatherService.checkWeather(date, currentWeatherForcast);
  }, [date, currentWeatherForcast]);

  const coldAlert = weatherCheckResult?.lowTemperature
    ? "It's going to be cold."
    : null;
  const rainAlert = weatherCheckResult?.rainExpected
    ? "It's likely to rain."
    : null;

  const alerts = [coldAlert, rainAlert].filter(
    (alert: string | null): boolean => alert !== null,
  );

  return alerts.length > 0 ? (
    <Grid item xs={12}>
      <Alert severity="warning" className={styles.wrapper}>
        {alerts.map((alert) => (
          <Typography fontSize="small">{alert}</Typography>
        ))}
      </Alert>
    </Grid>
  ) : null;
};
