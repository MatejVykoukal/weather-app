export declare module CurrentWeatherApi {
	interface Coord {
		lon: number;
		lat: number;
	}

	interface Weather {
		id: number;
		main: string;
		description: string;
		icon: string;
	}

	interface Main {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	}

	interface Wind {
		speed: number;
		deg: number;
	}

	interface Clouds {
		all: number;
	}

	interface Sys {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	}

	interface RootObject {
		coord: Coord;
		weather: Weather[];
		base: string;
		main: Main;
		visibility: number;
		wind: Wind;
		clouds: Clouds;
		dt: number;
		sys: Sys;
		timezone: number;
		id: number;
		name: string;
		cod: number;
	}
}

export interface ICurrentWeather extends CurrentWeatherApi.RootObject {
	formattedName: string;
	lat: number;
	lon: number;
}

export declare module WeatherForecastApi {
	interface Main {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		sea_level: number;
		grnd_level: number;
		humidity: number;
		temp_kf: number;
	}

	interface Weather {
		id: number;
		main: string;
		description: string;
		icon: string;
	}

	interface Clouds {
		all: number;
	}

	interface Wind {
		speed: number;
		deg: number;
		gust: number;
	}

	interface Sys {
		pod: string;
	}

	interface Rain {
		'3h': number;
	}

	interface Forecast {
		dt: number;
		main: Main;
		weather: Weather[];
		clouds: Clouds;
		wind: Wind;
		visibility: number;
		pop: number;
		sys: Sys;
		dt_txt: string;
		rain: Rain;
	}

	interface Coord {
		lat: number;
		lon: number;
	}

	interface City {
		id: number;
		name: string;
		coord: Coord;
		country: string;
		population: number;
		timezone: number;
		sunrise: number;
		sunset: number;
	}

	interface RootObject {
		cod: string;
		message: number;
		cnt: number;
		list: Forecast[];
		city: City;
	}
}

export type IWeatherForecast = WeatherForecastApi.Forecast[];

export interface WeatherError {
	error: boolean;
	message: string;
}
