import React, { useContext, useEffect } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import { weatherContext } from '../../contexts/weatherContext';
import Icon, { IconType } from '../Icon';

interface Props {
	icon: IconType;
	date: string;
	temp: string;
	time: string;
	weatherDesc: string;
}

const WeatherForecastCard: React.FC<Props> = ({
	icon,
	date,
	temp,
	time,
	weatherDesc,
}) => {
	const { dailyWeatherForecast } = useContext(weatherContext);

	useEffect(() => {
		if (dailyWeatherForecast) {
			new Glide('.glide', {
				type: 'slider',
				startAt: 0,
				perView: 2.5,
				perTouch: 1,
			}).mount();
		}
	}, [dailyWeatherForecast]);

	return (
		<li
			tabIndex={0}
			className="flex flex-col justify-center items-center gap-4 bg-glass p-4"
		>
			<span className="invisible">{weatherDesc}</span>
			<Icon icon={icon} size={100} />
			<div className="flex flex-col items-center">
				<span>{date}</span>
				<span>{time}</span>
			</div>
			<div className="flex font-semibold">
				<span className="text-4xl">{temp}</span>
				<span className="text-cyan-400 text-xl">°C</span>
			</div>
		</li>
	);
};

export default WeatherForecastCard;
