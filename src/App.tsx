import { useState } from 'react';
import SearchForm from './components/SearchForm';
import CurrentWeather from './CurrentWeather';
import AdressApi from './types/adressApi';
import CurrentWeatherApi from './types/currentWeatherApi';

export interface ICurrentWeather extends CurrentWeatherApi.RootObject {
	formattedName: string;
	lat: number;
	lon: number;
}

function App() {
	const [searchAdresses, setSearchAdresses] = useState<AdressApi.Feature[]>([]);
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();

	return (
		<div className="App">
			<header>
				<SearchForm
					setSearchAdresses={setSearchAdresses}
					setSearchPlace={setCurrentWeather}
					searchAdresses={searchAdresses}
				/>
			</header>
			<main>
				<CurrentWeather searchPlace={currentWeather} />
			</main>
		</div>
	);
}

export default App;
