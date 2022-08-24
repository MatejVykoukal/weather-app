import { json } from 'stream/consumers';
import { RequestConfig } from './utils';

const ADRESS_BASE_URL = `https://address-completion.p.rapidapi.com/v1/geocode/autocomplete`;

const ADRESS_REQUEST_OPTIONS = {
	method: 'GET',
	headers: {
		Accept: 'application/json',
		'X-RapidAPI-Host': String(process.env.REACT_APP_ADRESS_API_HOST),
		'X-RapidAPI-Key': String(process.env.REACT_APP_ADRESS_API_KEY),
	},
};

const ADRESS_BASE_PARAMS = {
	limit: '5',
	lang: 'en',
};

const CURRENT_WEATHER_BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

const CURRENT_WEATHER_REQUEST_OPTIONS = {
	method: 'GET',
};

const CURRENT_WEATHER_BASE_PARAMS = {
	lang: 'en',
	units: 'metric',
	appid: String(process.env.REACT_APP_WEATHER_API_KEY),
	mode: 'json',
};

const WEATHER_FORECAST_BASE_URL = `https://api.openweathermap.org/data/2.5/forecast`;

const WEATHER_FORECAST_REQUEST_OPTIONS = {
	method: 'GET',
};

const WEATHER_FORECAST_BASE_PARAMS = {
	lang: 'en',
	units: 'metric',
	appid: String(process.env.REACT_APP_WEATHER_API_KEY),
};

export const AdressRequestConfig = new RequestConfig(
	ADRESS_BASE_URL,
	ADRESS_BASE_PARAMS,
	ADRESS_REQUEST_OPTIONS
);

export const CurrentWeatherRequestConfig = new RequestConfig(
	CURRENT_WEATHER_BASE_URL,
	CURRENT_WEATHER_BASE_PARAMS,
	CURRENT_WEATHER_REQUEST_OPTIONS
);

export const WeatherForecastRequestConfig = new RequestConfig(
	WEATHER_FORECAST_BASE_URL,
	WEATHER_FORECAST_BASE_PARAMS,
	WEATHER_FORECAST_REQUEST_OPTIONS
);
