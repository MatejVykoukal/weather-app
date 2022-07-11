import React, { MouseEvent, useContext } from 'react';
import {
	CurrentWeatherRequestConfig,
	WeatherForecastRequestConfig,
} from '../../constants';
import { adressContext } from '../../contexts/adressContext';
import { weatherContext } from '../../contexts/weatherContext';
import { CurrentWeatherApi, WeatherForecastApi } from '../../types/weather';
import { getData } from '../../utils';
import { FetchResult } from '../../types/utils';

interface Props {}

const FormAutocomplete: React.FC<Props> = () => {
	const { setCurrentWeather, setDailyWeatherForecast } =
		useContext(weatherContext);
	const { setSearchAdresses, searchAdresses } = useContext(adressContext);

	const handleAdressClick = async (e: MouseEvent<HTMLButtonElement>) => {
		const placeId = e.currentTarget.id;
		const placeAdress = searchAdresses?.filter(
			({ properties }) => properties.place_id === placeId
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

		if (!weatherForecast || weatherForecastError /**|| {!setWeatherForecast*/)
			return;

		// Filter API data, since it returns forecast for every third hour, however we only need daily data.
		const dailyWeatherForecast = weatherForecast.list.map(
			(weatherData) => weatherData
		);

		if (setDailyWeatherForecast) setDailyWeatherForecast(dailyWeatherForecast);

		if (setSearchAdresses) setSearchAdresses([]);
	};

	return (
		<>
			{searchAdresses!.length > 0 && (
				<div className="absolute z-10 container  top-full left-0">
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
