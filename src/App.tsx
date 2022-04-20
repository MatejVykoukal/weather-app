import SearchForm from './components/SearchForm';
import { AdressProvider } from './contexts/adressContext';
import { WeatherProvider } from './contexts/weatherContext';
import CurrentWeather from './components/CurrentWeather';

function App() {
	return (
		<div className="App">
			<WeatherProvider>
				<header>
					<AdressProvider>
						<SearchForm />
					</AdressProvider>
				</header>
				<main>
					<CurrentWeather />
				</main>
			</WeatherProvider>
		</div>
	);
}

export default App;
