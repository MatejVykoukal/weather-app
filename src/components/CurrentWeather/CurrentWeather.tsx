import React, { useContext } from 'react';
import Icon from '../Icon';
import { IconType } from '../Icon/Icon';
import { weatherContext } from '../../contexts/weatherContext';
import WeatherDetails from '../WeatherDetail';
import classnames from 'classnames';
import { getFormatedDate } from '../../utils';

interface Props {}

const CurrentWeather: React.FC<Props> = () => {
	const { currentWeather } = useContext(weatherContext);

	return (
		<>
			{currentWeather && (
				<section className="container flex gap-10 flex-wrap justify-center">
					<h2 className="invisible absolute h-0 w-0">
						Current weather at ${currentWeather.formattedName}
					</h2>
					<div
						className={classnames(
							'flex flex-col relative gap-8 flex-grow text-white p-5 md:p-10 bg-cover',
							{
								'bg-sun-overlay': currentWeather.weather[0].icon === '01d',
								'bg-moon-overlay': currentWeather.weather[0].icon === '01n',
								'bg-clouds-day-overlay':
									currentWeather.weather[0].icon === '02d' ||
									currentWeather.weather[0].icon === '03d' ||
									currentWeather.weather[0].icon === '04d',
								'bg-clouds-night-overlay':
									currentWeather.weather[0].icon === '02n' ||
									currentWeather.weather[0].icon === '03n' ||
									currentWeather.weather[0].icon === '04n',
								'bg-mist-overlay': currentWeather.weather[0].icon === '50d',
								'bg-snow-overlay': currentWeather.weather[0].icon === '13d',
								'bg-rain-overlay': currentWeather.weather[0].icon === '10d',
								'bg-drizzle-overlay': currentWeather.weather[0].icon === '09d',
								'bg-thunderstorm-overlay':
									currentWeather.weather[0].icon === '11d',
							}
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
								<Icon
									icon={currentWeather.weather[0].icon.slice(0, 2) as IconType}
									size={100}
								/>
							</div>
						</div>
						<WeatherDetails
							icon="location"
							detail={currentWeather.formattedName}
						/>
					</div>
				</section>
			)}
		</>
	);
};

export default CurrentWeather;
