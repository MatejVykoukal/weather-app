import React, { MouseEvent, useContext } from 'react';
import { CurrentWeatherRequestConfig } from '../../constants';
import { adressContext } from '../../contexts/adressContext';
import { weatherContext } from '../../contexts/weatherContext';
import CurrentWeatherApi from '../../types/weather';
import { getData } from '../../utils';
import { FetchResult } from '../../types/utils';

interface Props {}

const FormAutocomplete: React.FC<Props> = () => {
	const { setCurrentWeather } = useContext(weatherContext);
	const { setSearchAdresses, searchAdresses } = useContext(adressContext);

	const handleAdressClick = async (e: MouseEvent<HTMLButtonElement>) => {
		const placeId = e.currentTarget.id;
		const placeAdress = searchAdresses?.filter(
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

		if (error || !currentWeather || !setCurrentWeather) return;

		setCurrentWeather({
			formattedName: placeAdress.properties.formatted,
			lat: placeAdress.properties.lat,
			lon: placeAdress.properties.lon,
			...currentWeather,
		});

		if (setSearchAdresses) setSearchAdresses([]);
	};

	return (
		<>
			{searchAdresses!.length > 0 && (
				<div className="absolute container left-0">
					<ul className="menu bg-base-200 w-full">
						{searchAdresses!.map(({ properties }, i) => (
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
