import './App.css';
import { MouseEvent, FormEvent, useState } from 'react';
import { getData, onlySpaces } from './utils';
import Icon from './components/Icon/Icon';
import { AdressRequestConfig, CurrentWeatherRequestConfig } from './constants';
import AdressApi from './types/adressApi';
import { FetchResult } from './utils/types';
import CurrentWeatherApi from './types/currentWeatherApi';

function App() {
	const [searchAdresses, setSearchAdresses] = useState<
		{
			properties: {
				lat: number;
				lon: number;
				formatted: string;
				place_id: string;
			};
		}[]
	>([]);
	const [searchPlace, setSearchPlace] = useState<{
		[key: string]: any;
		formattedName: string;
		lat: number;
		lon: number;
	}>();

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

		if (error) return;

		setSearchPlace({
			formattedName: placeAdress.properties.formatted,
			lat: placeAdress.properties.lat,
			lon: placeAdress.properties.lon,
			...currentWeather,
		});

		setSearchAdresses([]);
	};

	const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const searchInputElement: HTMLInputElement =
			e.currentTarget.querySelector('[name="search"]')!;

		const { value: searchQuery } = searchInputElement;

		if (onlySpaces(searchQuery)) {
			searchInputElement.value = '';
			return;
		}

		const { data: adresses, error }: FetchResult<AdressApi.RootObject> =
			await getData(AdressRequestConfig, {
				text: searchQuery,
			});

		if (error) {
			//TODO: Create error state & error component
			searchInputElement.value = '';
			return;
		}

		setSearchAdresses(adresses!.features);

		searchInputElement.value = '';
	};

	return (
		<div className="App">
			<div className="container relative">
				<form
					onSubmit={handleSearchSubmit}
					className="relative form-control items-center pt-10 pb-5"
				>
					<label htmlFor="search" className="w-0 h-0 absolute invisible">
						Enter city, country or country code
					</label>
					<div className="input-group rounded-full w-full">
						<input
							type="text"
							name="search"
							placeholder="Search for city, country, postcode, etc."
							className="input input-bordered flex-grow"
						/>
						<button type="submit" className="btn btn-square">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
					</div>
				</form>
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
			</div>
			<main>
				{searchPlace && (
					<div className="container mt-5 text-2xl">
						<h2>{searchPlace.formattedName}</h2>
						<div>
							<h3>
								Temperature: <span>{Math.round(searchPlace.main.temp)}°C</span>
							</h3>
							<Icon icon={searchPlace.weather[0].icon.slice(0, 2)} />
						</div>
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
