import './App.css';
import { MouseEvent, FormEvent, useState } from 'react';
import { onlySpaces } from './utils';
import sprite from './svg/sprite.svg';
import Icon from './components/Icon/Icon';

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

	const fetchWeatherData = async (lat: number, lon: number) => {
		const BASE_URL = `https://community-open-weather-map.p.rapidapi.com/weather?lat=${lat}&lon=${lon}&lang=en&units=metric`;

		const REQUEST_OPTIONS = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Host': String(process.env.REACT_APP_WEATHER_API_HOST),
				'X-RapidAPI-Key': String(process.env.REACT_APP_WEATHER_API_KEY),
			},
		};

		try {
			const data = await fetch(BASE_URL, REQUEST_OPTIONS).then((response) =>
				response.json()
			);
			return data;
		} catch (err) {
			console.error(err);
		}
	};

	const fetchAdressData = async (searchQuery: string) => {
		const BASE_URL = `https://address-completion.p.rapidapi.com/v1/geocode/autocomplete?text=${searchQuery}&limit=5&lang=en`;

		const REQUEST_OPTIONS = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Host': String(process.env.REACT_APP_ADRESS_API_HOST),
				'X-RapidAPI-Key': String(process.env.REACT_APP_ADRESS_API_KEY),
			},
		};

		try {
			const data = await fetch(BASE_URL, REQUEST_OPTIONS).then((response) =>
				response.json()
			);
			console.log(data.features);

			setSearchAdresses(data.features);
		} catch (err) {
			console.error(err);
		}
	};

	const handleAdressClick = async (e: MouseEvent<HTMLButtonElement>) => {
		const placeId = e.currentTarget.id;

		const placeAdress = searchAdresses.filter(
			({ properties }) => properties.place_id === placeId
		)[0];

		if (placeAdress) {
			const placeWeather = await fetchWeatherData(
				placeAdress.properties.lat,
				placeAdress.properties.lon
			);

			setSearchPlace({
				formattedName: placeAdress.properties.formatted,
				lat: placeAdress.properties.lat,
				lon: placeAdress.properties.lon,
				...placeWeather,
			});
		}

		setSearchAdresses([]);
	};

	return (
		<div className="App">
			<div className="container relative">
				<form
					onSubmit={(e: FormEvent<HTMLFormElement>) => {
						e.preventDefault();
						const searchInputElement: HTMLInputElement =
							e.currentTarget.querySelector('[name="search"]')!;
						const searchQuery = searchInputElement.value.trim();
						if (onlySpaces(searchQuery)) {
							searchInputElement.value = '';
							return;
						}
						fetchAdressData(searchQuery);
						searchInputElement.value = '';
					}}
					className="relative form-control items-center pt-10 pb-5"
				>
					<label htmlFor="search" className="w-0 h-0 absolute invisible">
						Enter city, country or country code
					</label>
					<div className="input-group rounded-full w-full">
						<input
							type="text"
							placeholder="Search for city, country, postcode, etc."
							name="search"
							id="search"
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
								Teplota: <span>{Math.round(searchPlace.main.temp)}°C</span>
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
