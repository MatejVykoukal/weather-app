import React, { useContext, useEffect, useState } from 'react';
import '@glidejs/glide/dist/css/glide.core.min.css';
import { weatherContext } from '../../contexts/weatherContext';
import { getFormatedDate, getFormatedTime } from '../../utils';
import { IconType } from '../Icon';
import Carousel from '../Carousel';
import WeatherForecastCard from '../WeatherForecastCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

interface Props {}

const WeatherForecast: React.FC<Props> = () => {
	const { dailyWeatherForecast } = useContext(weatherContext);
	const [uniqueDates, setUniqueDates] = useState<string[]>([]);

	useEffect(() => {
		if (dailyWeatherForecast) {
			const dates = dailyWeatherForecast.map((item) => {
				return getFormatedDate(item.dt);
			});

			setUniqueDates([...new Set(dates)]);
		}
	}, [dailyWeatherForecast]);

	return (
		<>
			{dailyWeatherForecast && uniqueDates && (
				<section className="container mt-16">
					<h2 className="text-xl">Detailed forecast for next 5 days</h2>
					<Tabs disableUpDownKeys>
						<TabList className=" mt-8 p-1 flex gap-4 justify-start overflow-auto ">
							{uniqueDates.map((uniqueDate, i) => {
								return (
									<Tab className="whitespace-nowrap btn rounded-none btn-primary [&[aria-selected='true']]:bg-transparent">
										{i === 0 ? 'Today' : i === 1 ? 'Tommorow' : uniqueDate}
									</Tab>
								);
							})}
						</TabList>
						{uniqueDates.map((uniqueDate, i) => {
							return (
								<TabPanel>
									<Carousel key={uniqueDate} id={`weather__carousel--${i}`}>
										{dailyWeatherForecast
											.filter(
												(forecast) =>
													getFormatedDate(forecast.dt) === uniqueDate
											)
											.map((filteredForecast) => (
												<WeatherForecastCard
													weatherDesc={filteredForecast.weather[0].description}
													temp={Math.round(
														filteredForecast.main.temp
													).toString()}
													date={uniqueDate}
													time={getFormatedTime(filteredForecast.dt)}
													icon={
														filteredForecast.weather[0].icon.slice(
															0,
															2
														) as IconType
													}
													key={filteredForecast.dt}
												/>
											))}
									</Carousel>
								</TabPanel>
							);
						})}
					</Tabs>
				</section>
			)}
		</>
	);
};

export default WeatherForecast;
