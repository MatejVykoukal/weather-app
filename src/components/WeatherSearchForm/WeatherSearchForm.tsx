import React, { useContext } from 'react';
import { AdressRequestConfig } from '../../constants';
import { adressContext } from '../../contexts/adressContext';
import { weatherContext } from '../../contexts/weatherContext';
import { getData } from '../../utils';
import { FetchResult } from '../../types/utils';
import AdressApi from '../../types/adress';
import Autocomplete from 'accessible-autocomplete/react';

interface Props {}

const WeatherSearchForm: React.FC<Props> = () => {
	const { setWeatherData } = useContext(weatherContext);
	const { setSearchAdresses, searchAdresses } = useContext(adressContext);

	const searchInput = document.getElementById(
		'weather-search'
	) as HTMLInputElement;

	const handleAdressSubmit = async (adress: string) => {
		const placeAdress = searchAdresses?.filter(
			({ properties }) => properties.formatted === adress
		)[0];

		if (!placeAdress) return;

		setWeatherData!(
			placeAdress.properties.lat,
			placeAdress.properties.lon,
			placeAdress.properties.formatted
		);

		setSearchAdresses!([]);

		searchInput.value = '';
	};

	const getAutocompleteData = async (
		query: string,
		populateResults: Function
	) => {
		const { data: adresses, error }: FetchResult<AdressApi.RootObject> =
			await getData(AdressRequestConfig, {
				text: query,
			});
		if (error)
			//TODO: Create error state & error component
			return;

		setSearchAdresses!(adresses!.features);
		populateResults(
			adresses!.features.map(({ properties }) => properties.formatted)
		);
	};

	return (
		<form className="mt-8" onSubmit={(e) => e.preventDefault()} role="search">
			<label htmlFor="weather-search" className="w-0 h-0 absolute invisible">
				Search for weather in city, country or country code
			</label>
			<div className="container">
				<Autocomplete
					id="weather-search"
					minLength={2}
					source={getAutocompleteData}
					onConfirm={handleAdressSubmit}
					displayMenu="overlay"
					placeholder="Search for city, postcode, country, etc."
					templates={{
						inputValue: () => {
							return '';
						},
					}}
				/>
			</div>
		</form>
	);
};

export default WeatherSearchForm;
