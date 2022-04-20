import React from 'react';
import { ICurrentWeather } from '../App';
import Icon from '../components/Icon';
import { IconType } from '../components/Icon/Icon';

interface Props {
	searchPlace: ICurrentWeather | undefined;
}

const CurrentWeather: React.FC<Props> = ({ searchPlace }) => {
	return (
		<div>
			{searchPlace && (
				<div className="container mt-5 text-2xl">
					<h2>{searchPlace.formattedName}</h2>
					<div>
						<h3>
							Temperature: <span>{Math.round(searchPlace.main.temp)}°C</span>
						</h3>
						<Icon icon={searchPlace.weather[0].icon.slice(0, 2) as IconType} />
					</div>
				</div>
			)}
		</div>
	);
};

export default CurrentWeather;
