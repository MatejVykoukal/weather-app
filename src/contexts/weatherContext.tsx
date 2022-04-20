import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useState,
} from 'react';
import { ICurrentWeather } from '../types/weather';

interface Props {
	children: React.ReactNode;
}

interface WeatherContextValue {
	currentWeather: ICurrentWeather | undefined;
	setCurrentWeather: Dispatch<SetStateAction<ICurrentWeather | undefined>>;
}

export const weatherContext = createContext<Partial<WeatherContextValue>>({});

export const WeatherProvider: React.FC<Props> = ({ children }) => {
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();

	const value: WeatherContextValue = { currentWeather, setCurrentWeather };

	return (
		<weatherContext.Provider value={value}>{children}</weatherContext.Provider>
	);
};
