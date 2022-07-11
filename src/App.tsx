import SearchForm from './components/SearchForm';
import { AdressProvider } from './contexts/adressContext';
import { WeatherProvider } from './contexts/weatherContext';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';

// TODO: Test accesibility and enhance it. Especially search autocomplete.
// TODO: Display weather data based on query params(probably lat,lon/cityName)
function App() {
	return (
		<div className="App min-h-screen bg-gradient-to-tr from-slate-900 to-slate-800 ">
			<WeatherProvider>
				<header className="py-8">
					<h1 className="container text-center text-xl">Weather Forecast</h1>
					<AdressProvider>
						<SearchForm />
					</AdressProvider>
				</header>
				<main>
					<CurrentWeather />
					<WeatherForecast />
				</main>
			</WeatherProvider>
		</div>
	);
}

export default App;
