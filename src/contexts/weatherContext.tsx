import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useState,
} from 'react';
import { ICurrentWeather, IWeatherForecast } from '../types/weather';

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
}

export const weatherContext = createContext<Partial<WeatherContextValue>>({});

export const WeatherProvider: React.FC<Props> = ({ children }) => {
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();
	const [dailyWeatherForecast, setDailyWeatherForecast] =
		useState<IWeatherForecast>();

	const value: WeatherContextValue = {
		currentWeather,
		setCurrentWeather,
		dailyWeatherForecast,
		setDailyWeatherForecast,
	};

	return (
		<weatherContext.Provider value={value}>{children}</weatherContext.Provider>
	);
};
