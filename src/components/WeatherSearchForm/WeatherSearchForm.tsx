import React, { useContext } from 'react';
import { AddressRequestConfig } from '../../constants';
import { addressContext } from '../../contexts/addressContext';
import { weatherContext } from '../../contexts/weatherContext';
import { getData } from '../../utils';
import { FetchResult } from '../../types/utils';
import AddressApi from '../../types/address';
import Autocomplete from 'accessible-autocomplete/react';

interface Props {}

const WeatherSearchForm: React.FC<Props> = () => {
	const { setSearchParams } = useContext(weatherContext);
	const { setSearchAddresses, searchAddresses } = useContext(addressContext);

	const searchInput = document.getElementById(
		'weather-search'
	) as HTMLInputElement;

	const handleAddressSubmit = async (address: string) => {
		const placeAddress = searchAddresses?.filter(
			({ properties }) => properties.formatted === address
		)[0];

		if (!placeAddress) return;

		setSearchParams!({
			lat: placeAddress.properties.lat.toString(),
			lon: placeAddress.properties.lon.toString(),
		});

		setSearchAddresses!([]);

		searchInput.value = '';
	};

	const getAutocompleteData = async (
		query: string,
		populateResults: Function
	) => {
		const { data: addresses, error }: FetchResult<AddressApi.RootObject> =
			await getData(AddressRequestConfig, {
				text: query,
			});
		if (error) return;

		setSearchAddresses!(addresses!.features);
		populateResults(
			addresses!.features.map(({ properties }) => properties.formatted)
		);
	};

	return (
		<form
			className="mt-4 sm:mt-8"
			onSubmit={(e) => e.preventDefault()}
			role="search"
		>
			<label htmlFor="weather-search" className="w-0 h-0 absolute invisible">
				Search for weather in city, country or country code
			</label>

			<Autocomplete
				id="weather-search"
				minLength={2}
				source={getAutocompleteData}
				onConfirm={handleAddressSubmit}
				displayMenu="overlay"
				placeholder="Search for city, postcode, country, etc."
				templates={{
					inputValue: () => {
						return '';
					},
				}}
			/>
		</form>
	);
};

export default WeatherSearchForm;
