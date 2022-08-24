import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useState,
} from 'react';
import AddressApi from '../types/address';

interface Props {
	children: React.ReactNode;
}

interface WeatherContextValue {
	setSearchAddresses: Dispatch<SetStateAction<AddressApi.Feature[]>>;
	searchAddresses: AddressApi.Feature[];
}

export const addressContext = createContext<Partial<WeatherContextValue>>({});

export const AddressProvider: React.FC<Props> = ({ children }) => {
	const [searchAddresses, setSearchAddresses] = useState<AddressApi.Feature[]>(
		[]
	);

	const value: WeatherContextValue = { searchAddresses, setSearchAddresses };

	return (
		<addressContext.Provider value={value}>{children}</addressContext.Provider>
	);
};
