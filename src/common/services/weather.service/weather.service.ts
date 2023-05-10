import { WeatherForecastDto } from 'common/model/dto';
import { PartOfDay, WeatherForecast, WeatherForecastResponse } from './types';
import { GeoLocationService } from '../geolocation.service';
import { handleResponse } from 'common/utils';
import dayjs from 'dayjs';

const getCurrentWeatherForecast =
  async (): Promise<WeatherForecastResponse> => {
    const apiBaseUrl = 'https://api.openweathermap.org/data/2.5';
    const endpoint = '/forecast';

    const {
      coords: { latitude, longitude },
    } = await GeoLocationService.getPosition();
    const appId = process.env.REACT_APP_OPENWEATHERMAP_APIKEY || '';
    const units = 'metric';
    const searchParams = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
      appid: appId,
      units,
    });

    const response = await fetch(`${apiBaseUrl}${endpoint}?${searchParams}`, {
      method: 'GET',
      mode: 'cors',
    });

    return await handleResponse<WeatherForecastResponse>(response);
  };

const checkWeather = (
  date: Date,
  currentWeatherForecast: WeatherForecastResponse,
): WeatherForecastDto | null => {
  const selectedDateForecasts: WeatherForecast[] =
    currentWeatherForecast.list.filter((forecast: WeatherForecast): boolean => {
      const forecastDate = new Date(forecast.dt * 1000);
      const matchSelectedDate = dayjs(forecastDate).isSame(date, 'day');
      if (!matchSelectedDate) return false;
      const isDayTime = forecast.sys.pod === PartOfDay.Day;
      return isDayTime ? true : false;
    });

  if (selectedDateForecasts.length === 0) {
    return null;
  }

  const MIN_TEMPERATURE = 10; // deg Celcius
  const lowTemperature = selectedDateForecasts.some(
    (forecast: WeatherForecast): boolean => {
      return forecast.main.temp < MIN_TEMPERATURE;
    },
  );

  const rainExpected = selectedDateForecasts.some(
    (forecast: WeatherForecast): boolean => {
      return Boolean(forecast.rain);
    },
  );

  return {
    date,
    lowTemperature,
    rainExpected,
  };
};

export const WeatherService = {
  getCurrentWeatherForecast,
  checkWeather,
};
