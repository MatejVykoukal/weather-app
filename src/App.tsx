import SearchForm from './components/SearchForm';
import { AdressProvider } from './contexts/adressContext';
import { weatherContext } from './contexts/weatherContext';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import { useContext, useEffect, useState } from 'react';
import { COORDS_INITAL } from './constants';
import classNames from 'classnames';
import Error from './components/Error';

// TODO: Test accesibility and enhance it. Especially search autocomplete.
// TODO: Display weather data based on query params(probably lat,lon/cityName)
function App() {
	const [loading, setLoading] = useState(false);

	const { setWeatherData, error } = useContext(weatherContext);

	const successCallback = async (data: GeolocationPosition) => {
		if (loading || !setWeatherData) return;

		localStorage.setItem('userLat', data.coords.latitude.toString());
		localStorage.setItem('userLon', data.coords.longitude.toString());

		setLoading(true);
		setWeatherData(data.coords.latitude, data.coords.longitude);
		setLoading(false);
	};
	const failureCallback = (data: GeolocationPositionError) => {};

	useEffect(() => {
		if (window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition(
				successCallback,
				failureCallback
			);
		}
		if (!setWeatherData) return;

		if (
			localStorage &&
			localStorage.getItem('userLat') &&
			localStorage.getItem('userLon')
		) {
			setLoading(true);
			setWeatherData(
				Number(localStorage.getItem('userLat')),
				Number(localStorage.getItem('userLon'))
			);
			setLoading(false);
		} else {
			setLoading(true);
			setWeatherData(COORDS_INITAL.lat, COORDS_INITAL.lon);
			setLoading(false);
		}
	}, []);

	return (
		<div className={classNames({ 'opacity-50 pointer-events-none': loading })}>
			<div className="App min-h-screen bg-gradient-to-tr from-slate-900 to-slate-800 ">
				<header className="py-8">
					<h1 className="container text-center text-xl">Weather Forecast</h1>
					<AdressProvider>
						<SearchForm />
					</AdressProvider>
				</header>
				<main>
					{error ? (
						<Error />
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
