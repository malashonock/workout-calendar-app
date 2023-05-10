import { WeatherForecast } from '.';

export interface WeatherForecastResponse {
  cod: string; // HTTP response status code
  message: number; // Internal parameter
  cnt: number; // The number of timestamps returned
  list: WeatherForecast[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number; // Latitude
      lon: number; // Longitude
    };
    country: string; // Country code
    population: number;
    timezone: number; // Shift in seconds from UTC
    sunrise: number; // Sunrise time, Unix, UTC
    sunset: number; // Sunset time, Unix, UTC
  };
}
