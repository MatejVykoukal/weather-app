import React, { useContext } from 'react';
import Icon from '../Icon';
import { IconType } from '../Icon/Icon';
import { weatherContext } from '../../contexts/weatherContext';

interface Props {}

const CurrentWeather: React.FC<Props> = () => {
	const { currentWeather } = useContext(weatherContext);

	return (
		<div>
			{currentWeather && (
				<div className="container mt-5 text-2xl">
					<h2>{currentWeather.formattedName}</h2>
					<div>
						<h3>
							Temperature: <span>{Math.round(currentWeather.main.temp)}°C</span>
						</h3>
						<Icon
							icon={currentWeather.weather[0].icon.slice(0, 2) as IconType}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CurrentWeather;
