import React, { useContext } from 'react';
import Icon from '../Icon';
import { weatherContext } from '../../contexts/weatherContext';
import WeatherDetails from '../WeatherDetail';
import classnames from 'classnames';
import { capitalize, getFormatedDate } from '../../utils';
import { ApiWeatherIcons, IApiWeatherIconCodes } from '../../types/weather';

interface Props {}

const CurrentWeather: React.FC<Props> = () => {
	const { currentWeather } = useContext(weatherContext);

	const getBackgroundImageClass = (icon: string) => {
		switch (icon) {
			case '01d':
				return 'bg-sun-overlay';
			case '01n':
				return 'bg-moon-overlay';
			case '02d':
			case '03d':
			case '04d':
				return 'bg-clouds-day-overlay';
			case '02n':
			case '03n':
			case '04n':
				return 'bg-clouds-night-overlay';
			case '50d':
				return 'bg-mist-overlay';
			case '13d':
				return 'bg-snow-overlay';
			case '10d':
				return 'bg-rain-overlay';
			case '09d':
				return 'bg-drizzle-overlay';
			case '11d':
				return 'bg-thunderstorm-overlay';
			default:
				return '';
		}
	};

	return (
		<>
			{currentWeather && (
				<section
					aria-label="Current weather"
					className="container flex gap-10 flex-wrap justify-center"
				>
					<h2 className="invisible absolute h-0 w-0">
						Current weather at ${currentWeather.formattedName}
					</h2>
					<div
						className={classnames(
							'flex flex-col relative gap-8 flex-grow text-white p-5 md:p-10 bg-cover',
							getBackgroundImageClass(currentWeather.weather[0].icon)
						)}
					>
						<div className="flex flex-wrap items-center justify-between gap-4">
							<span className="text-4xl">Today</span>
							<span>{getFormatedDate(currentWeather.dt)}</span>
						</div>
						<div>
							<div className="flex justify-between items-center flex-wrap gap-4">
								<div className="flex gap-4">
									<div className="flex font-semibold">
										<span className="text-6xl">
											{Math.round(currentWeather.main.temp)}
										</span>
										<span className="text-cyan-400 text-2xl">°C</span>
									</div>
									<div className="flex flex-col flex-wrap justify-center gap-1">
										<WeatherDetails
											icon="humidity"
											detail={`${currentWeather.main.humidity}%`}
										/>
										<WeatherDetails
											icon="pressure"
											detail={`${currentWeather.main.pressure} KPa`}
										/>
									</div>
								</div>
								<div className="flex flex-col items-center gap-4">
									<Icon
										icon={
											ApiWeatherIcons[
												currentWeather.weather[0].icon.slice(
													0,
													2
												) as IApiWeatherIconCodes
											]
										}
										size={100}
									/>
								</div>
							</div>
						</div>

						<div className="flex justify-between">
							<WeatherDetails
								icon="location"
								detail={currentWeather.formattedName}
							/>
							<WeatherDetails
								icon="text"
								detail={capitalize(currentWeather.weather[0].description)}
							/>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default CurrentWeather;
