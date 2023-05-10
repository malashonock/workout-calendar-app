import { FunctionComponent, createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { WeatherForecastResponse, WeatherService } from 'common/services';

export const WeatherForecastContext =
  createContext<WeatherForecastResponse | null>(null);

export const WeatherForecastProvider: FunctionComponent = () => {
  const [currentWeatherForecast, setCurrentWeatherForecast] =
    useState<WeatherForecastResponse | null>(null);

  useEffect(() => {
    (async () => {
      const weatherForecast = await WeatherService.getCurrentWeatherForecast();
      setCurrentWeatherForecast(weatherForecast);
    })();
  }, []);

  return (
    <WeatherForecastContext.Provider value={currentWeatherForecast}>
      <Outlet />
    </WeatherForecastContext.Provider>
  );
};
