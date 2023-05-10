import { PartOfDay, WeatherCondition } from '.';

export interface WeatherForecast {
  dt: number; // Time of data forecasted, Unix, UTC
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    temp_kf: number; // Internal parameter
    humidity: number; // Humidity, %
    pressure: number; // Atmospheric pressure on the sea level, hPa
    sea_level: number; // Atmospheric pressure on the sea level, hPa
    grnd_level: number; // Atmospheric pressure on the ground level, hPa
  };
  weather: WeatherCondition[];
  clouds: {
    all: number; // Cloudiness, %
  };
  wind: {
    speed: number; // meters p. second | miles p. hour
    deg: number; // Wind direction, degrees (meteorological)
    gust: number; // meters p. second | miles p. hour
  };
  visibility: number; // Average visibility, metres (max 10km)
  pop: number; // Probability of precipitation (0 to 1)
  rain?: {
    '3h': number; // Rain volume for last 3 hours, mm
  };
  snow?: {
    '3h': number; // Snow volume for last 3 hours, mm
  };
  sys: {
    pod: PartOfDay;
  };
  dt_txt: string; // Time of data forecasted, ISO, UTC
}
