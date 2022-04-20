import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useState,
} from 'react';
import AdressApi from '../types/adress';

interface Props {
	children: React.ReactNode;
}

interface WeatherContextValue {
	setSearchAdresses: Dispatch<SetStateAction<AdressApi.Feature[]>>;
	searchAdresses: AdressApi.Feature[];
}

export const adressContext = createContext<Partial<WeatherContextValue>>({});

export const AdressProvider: React.FC<Props> = ({ children }) => {
	const [searchAdresses, setSearchAdresses] = useState<AdressApi.Feature[]>([]);

	const value: WeatherContextValue = { searchAdresses, setSearchAdresses };

	return (
		<adressContext.Provider value={value}>{children}</adressContext.Provider>
	);
};
