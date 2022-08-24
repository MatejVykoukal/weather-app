import SearchForm from '../WeatherSearchForm';
import { AddressProvider } from '../../contexts/addressContext';
import { weatherContext } from '../../contexts/weatherContext';
import CurrentWeather from '../CurrentWeather';
import WeatherForecast from '../WeatherForecast';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import Error from '../Error';
import Icon from '../Icon';

// TODO: Depoloy demo application

function App() {
	const [loading, setLoading] = useState(false);

	const {
		currentWeather,
		dailyWeatherForecast,
		setWeatherData,
		error,
		setError,
		searchParams,
		setSearchParams,
	} = useContext(weatherContext);

	const geolocationSuccessCallback = (data: GeolocationPosition) => {
		setSearchParams!({
			lat: data.coords.latitude.toString(),
			lon: data.coords.longitude.toString(),
		});
	};

	const geolocationErrorCallback = () => {
		setError!({
			error: true,
			message:
				'You denied access to your location. Please use search bar to find weather in your location.',
		});
	};

	useEffect(() => {
		const searchLat = Number(searchParams!.get('lat'));
		const searchLon = Number(searchParams!.get('lon'));

		if (!searchLat || !searchLon) return;

		setLoading(true);
		setWeatherData!(searchLat, searchLon);
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	const handleWeatherAtMyLocation = () => {
		window.navigator.geolocation.getCurrentPosition(
			geolocationSuccessCallback,
			geolocationErrorCallback
		);
	};

	return (
		<div className={classNames({ 'opacity-50 pointer-events-none': loading })}>
			<div className="min-h-screen bg-gradient-to-tr from-slate-900 to-slate-800 ">
				<header className="py-8 container">
					<div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-between">
						<div className="flex gap-2 items-center">
							<Icon icon="clear-sky" size={24} />
							<a href="/">
								<h1 className="text-xl">Weather Forecast</h1>
							</a>
						</div>
						<button
							onClick={handleWeatherAtMyLocation}
							className="btn btn-ghost button-sm flex-nowrap gap-2"
						>
							<Icon icon="location" size={16} />
							See Weather at my location
						</button>
					</div>
					<AddressProvider>
						<SearchForm />
					</AddressProvider>
				</header>
				<main>
					{error?.error ? (
						<Error message={error.message} />
					) : currentWeather && dailyWeatherForecast ? (
						<>
							<CurrentWeather />
							<WeatherForecast />
						</>
					) : (
						<h2 className="opacity-50 text-3xl  text-center container">
							Search for weather using search bar, or try using "See weather at
							my location" feature.
						</h2>
					)}
				</main>
			</div>
		</div>
	);
}

export default App;
