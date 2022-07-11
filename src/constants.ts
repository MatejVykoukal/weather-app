import { RequestConfig } from './utils';

const ADRESS_BASE_URL = `https://address-completion.p.rapidapi.com/v1/geocode/autocomplete`;

const ADRESS_BASE_PARAMS = {
	limit: '5',
	lang: 'en',
};
const ADRESS_REQUEST_OPTIONS = {
	method: 'GET',
	headers: {
		Accept: 'application/json',
		'X-RapidAPI-Host': String(process.env.REACT_APP_ADRESS_API_HOST),
		'X-RapidAPI-Key': String(process.env.REACT_APP_ADRESS_API_KEY),
	},
};

const CURRENT_WEATHER_BASE_URL = `https://community-open-weather-map.p.rapidapi.com/weather`;

const CURRENT_WEATHER_BASE_PARAMS = {
	lang: 'en',
	units: 'metric',
};

const CURRENT_WEATHER_REQUEST_OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': String(process.env.REACT_APP_WEATHER_API_HOST),
		'X-RapidAPI-Key': String(process.env.REACT_APP_WEATHER_API_KEY),
	},
};

const WEATHER_FORECAST_BASE_URL = `https://community-open-weather-map.p.rapidapi.com/forecast`;

const WEATHER_FORECAST_REQUEST_OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': String(process.env.REACT_APP_WEATHER_API_HOST),
		'X-RapidAPI-Key': String(process.env.REACT_APP_WEATHER_API_KEY),
	},
};

const WEATHER_FORECAST_BASE_PARAMS = {
	lang: 'en',
	units: 'metric',
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
