import React, { useContext } from 'react';
import {
	AdressRequestConfig,
	CurrentWeatherRequestConfig,
	WeatherForecastRequestConfig,
} from '../../constants';
import { adressContext } from '../../contexts/adressContext';
import { weatherContext } from '../../contexts/weatherContext';
import { CurrentWeatherApi, WeatherForecastApi } from '../../types/weather';
import { getData } from '../../utils';
import { FetchResult } from '../../types/utils';
import AdressApi from '../../types/adress';
import Autocomplete from 'accessible-autocomplete/react';

interface Props {}

const SearchForm: React.FC<Props> = () => {
	const { setCurrentWeather, setDailyWeatherForecast } =
		useContext(weatherContext);
	const { setSearchAdresses, searchAdresses } = useContext(adressContext);

	const searchInput = document.getElementById(
		'weather-search'
	) as HTMLInputElement;

	const handleAdressSubmit = async (adress: string) => {
		const placeAdress = searchAdresses?.filter(
			({ properties }) => properties.formatted === adress
		)[0];

		if (!placeAdress) return;

		const {
			data: currentWeather,
			error: currentWeatherError,
		}: FetchResult<CurrentWeatherApi.RootObject> = await getData(
			CurrentWeatherRequestConfig,
			{
				lat: placeAdress.properties.lat.toString(),
				lon: placeAdress.properties.lon.toString(),
			}
		);
		const {
			data: weatherForecast,
			error: weatherForecastError,
		}: FetchResult<WeatherForecastApi.RootObject> = await getData(
			WeatherForecastRequestConfig,
			{
				lat: placeAdress.properties.lat.toString(),
				lon: placeAdress.properties.lon.toString(),
			}
		);

		if (currentWeatherError || !currentWeather || !setCurrentWeather) return;

		setCurrentWeather({
			formattedName: placeAdress.properties.formatted,
			lat: placeAdress.properties.lat,
			lon: placeAdress.properties.lon,
			...currentWeather,
		});

		if (!weatherForecast || weatherForecastError) return;

		const dailyWeatherForecast = weatherForecast.list.map(
			(weatherData) => weatherData
		);

		if (setDailyWeatherForecast) setDailyWeatherForecast(dailyWeatherForecast);
		if (setSearchAdresses) setSearchAdresses([]);

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
		if (error || !setSearchAdresses) {
			//TODO: Create error state & error component
			return;
		}
		setSearchAdresses(adresses!.features);
		populateResults(
			adresses!.features.map(({ properties }) => properties.formatted)
		);
	};

	return (
		<form className="mt-8" onSubmit={(e) => e.preventDefault()} role="search">
			<label htmlFor="search" className="w-0 h-0 absolute invisible">
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

export default SearchForm;
