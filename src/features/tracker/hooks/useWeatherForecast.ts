import { useContext } from 'react';

import { WeatherForecastContext } from '../components';
import { WeatherForecastResponse } from 'common/services';

export const useWeatherForecast = (): WeatherForecastResponse | null => {
  const currentWeatherForecast = useContext(WeatherForecastContext);
  return currentWeatherForecast;
};
