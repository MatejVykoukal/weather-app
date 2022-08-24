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
	WeatherError,
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
	setWeatherData: (
		lat: number,
		lon: number,
		formattedName?: string
	) => Promise<true | undefined>;
	error: WeatherError;
	setError: Dispatch<SetStateAction<WeatherError>>;
}

export const weatherContext = createContext<Partial<WeatherContextValue>>({});

export const WeatherProvider: React.FC<Props> = ({ children }) => {
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();
	const [dailyWeatherForecast, setDailyWeatherForecast] =
		useState<IWeatherForecast>();

	const [error, setError] = useState<WeatherError>({
		error: false,
		message: '',
	});

	const setWeatherData = async (
		lat: number,
		lon: number,
		formattedName?: string
	) => {
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
			setError({
				error: true,
				message: '',
			});
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
			formattedName: formattedName ? formattedName : currentWeather.name,
			lat: lat,
			lon: lon,
			...currentWeather,
		});

		setDailyWeatherForecast(
			weatherForecast.list.map((weatherData) => weatherData)
		);
		setError({ error: false, message: '' });

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
