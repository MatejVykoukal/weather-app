import SearchForm from './components/WeatherSearchForm';
import { AdressProvider } from './contexts/adressContext';
import { weatherContext } from './contexts/weatherContext';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import Error from './components/Error';
import Icon from './components/Icon';

// TODO: Add favicon to app
// TODO: Transform TW classes to TW components

function App() {
	const [loading, setLoading] = useState(false);

	const { setWeatherData, error, setError, searchParams, setSearchParams } =
		useContext(weatherContext);

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
			<div className="App min-h-screen bg-gradient-to-tr from-slate-900 to-slate-800 ">
				<header className="py-8">
					<div className="container flex flex-wrap items-center gap-4 justify-between">
						<div className="flex gap-2 items-center">
							<Icon icon="clear-sky" size={24} />
							<h1 className="text-xl">
								<a href="/">Weather Forecast</a>
							</h1>
						</div>
						<button
							onClick={handleWeatherAtMyLocation}
							className="btn btn-ghost btn-sm flex gap-2"
						>
							<Icon icon="location" size={16} />
							<span>See Weather at my location</span>
						</button>
					</div>
					<AdressProvider>
						<SearchForm />
					</AdressProvider>
				</header>
				<main>
					{error?.error ? (
						<Error message={error.message} />
					) : (
						<>
							<CurrentWeather />
							<WeatherForecast />
						</>
					)}
				</main>
			</div>
		</div>
	);
}

export default App;
