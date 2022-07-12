import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useState,
} from 'react';
import {
	CurrentWeatherRequestConfig,
	WeatherForecastRequestConfig,
} from '../constants';
import { FetchResult } from '../types/utils';
import {
	CurrentWeatherApi,
	ICurrentWeather,
	IWeatherForecast,
	WeatherForecastApi,
} from '../types/weather';
import { getData } from '../utils';

interface Props {
	children: React.ReactNode;
}

interface WeatherContextValue {
	currentWeather: ICurrentWeather | undefined;
	setCurrentWeather: Dispatch<SetStateAction<ICurrentWeather | undefined>>;
	dailyWeatherForecast: IWeatherForecast | undefined;
	setDailyWeatherForecast: Dispatch<
		SetStateAction<IWeatherForecast | undefined>
	>;
	setWeatherData: (lat: number, lon: number) => Promise<true | undefined>;
	error: boolean;
	setError: Dispatch<SetStateAction<boolean>>;
}

export const weatherContext = createContext<Partial<WeatherContextValue>>({});

export const WeatherProvider: React.FC<Props> = ({ children }) => {
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();
	const [dailyWeatherForecast, setDailyWeatherForecast] =
		useState<IWeatherForecast>();

	const [error, setError] = useState<boolean>(false);

	const setWeatherData = async (lat: number, lon: number) => {
		const {
			data: currentWeather,
			error: currentWeatherError,
		}: FetchResult<CurrentWeatherApi.RootObject> = await getData(
			CurrentWeatherRequestConfig,
			{
				lat: lat.toString(),
				lon: lon.toString(),
			}
		);
		const {
			data: weatherForecast,
			error: weatherForecastError,
		}: FetchResult<WeatherForecastApi.RootObject> = await getData(
			WeatherForecastRequestConfig,
			{
				lat: lat.toString(),
				lon: lon.toString(),
			}
		);

		if (
			currentWeatherError ||
			weatherForecastError ||
			(currentWeather as any).message ||
			(weatherForecast as any).message
		) {
			console.log((currentWeather as any).message);

			setError(true);
			return;
		}

		if (
			!currentWeather ||
			!setCurrentWeather ||
			!weatherForecast ||
			!setDailyWeatherForecast
		)
			return;

		setCurrentWeather({
			formattedName: currentWeather.name,
			lat: lat,
			lon: lon,
			...currentWeather,
		});

		setDailyWeatherForecast(
			weatherForecast.list.map((weatherData) => weatherData)
		);
		return true;
	};

	const value: WeatherContextValue = {
		currentWeather,
		setCurrentWeather,
		dailyWeatherForecast,
		setDailyWeatherForecast,
		setWeatherData,
		error,
		setError,
	};

	return (
		<weatherContext.Provider value={value}>{children}</weatherContext.Provider>
	);
};
