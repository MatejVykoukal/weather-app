import SearchForm from './components/WeatherSearchForm';
import { AdressProvider } from './contexts/adressContext';
import { weatherContext } from './contexts/weatherContext';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import Error from './components/Error';

// TODO: Display weather data based on query params(probably lat,lon/cityName)
function App() {
	const [loading, setLoading] = useState(false);

	const { setWeatherData, error, setError } = useContext(weatherContext);

	const successCallback = (data: GeolocationPosition) => {
		setLoading(true);
		setWeatherData!(data.coords.latitude, data.coords.longitude);
		setLoading(false);
	};

	const errorCallback = () => {
		setError!({
			error: true,
			message:
				'You denied access to your location. Please use search bar to find weather in your location.',
		});
	};

	useEffect(() => {
		window.navigator.geolocation.getCurrentPosition(
			successCallback,
			errorCallback
		);
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
