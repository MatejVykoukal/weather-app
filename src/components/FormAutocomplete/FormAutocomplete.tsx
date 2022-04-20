import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import { ICurrentWeather } from '../../App';
import { CurrentWeatherRequestConfig } from '../../constants';
import AdressApi from '../../types/adressApi';
import CurrentWeatherApi from '../../types/currentWeatherApi';
import { getData } from '../../utils';
import { FetchResult } from '../../utils/types';

interface Props {
	searchAdresses: AdressApi.Feature[];
	setSearchPlace: Dispatch<SetStateAction<ICurrentWeather | undefined>>;
	setSearchAdresses: Dispatch<SetStateAction<AdressApi.Feature[]>>;
}

const FormAutocomplete: React.FC<Props> = ({
	searchAdresses,
	setSearchPlace,
	setSearchAdresses,
}) => {
	const handleAdressClick = async (e: MouseEvent<HTMLButtonElement>) => {
		const placeId = e.currentTarget.id;
		const placeAdress = searchAdresses.filter(
			({ properties }) => properties.place_id === placeId
		)[0];

		if (!placeAdress) return;

		const {
			data: currentWeather,
			error,
		}: FetchResult<CurrentWeatherApi.RootObject> = await getData(
			CurrentWeatherRequestConfig,
			{
				lat: placeAdress.properties.lat.toString(),
				lon: placeAdress.properties.lon.toString(),
			}
		);

		if (error || !currentWeather) return;

		setSearchPlace({
			formattedName: placeAdress.properties.formatted,
			lat: placeAdress.properties.lat,
			lon: placeAdress.properties.lon,
			...currentWeather,
		});

		setSearchAdresses([]);
	};

	return (
		<>
			{searchAdresses.length > 0 && (
				<div className="absolute container left-0">
					<ul className="menu bg-base-200 w-full">
						{searchAdresses.map(({ properties }, i) => (
							<li key={i}>
								<button id={properties.place_id} onClick={handleAdressClick}>
									{properties.formatted}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default FormAutocomplete;
