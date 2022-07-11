import React from 'react';
import Icon from '../Icon';
import { IconType } from '../Icon/Icon';

interface Props {
	icon: IconType;
	detail: string;
	className?: string;
}

const WeatherDetails: React.FC<Props> = ({ icon, detail, className }) => {
	return (
		<div className={`${className} flex items-center`}>
			<Icon icon={icon} size={20} />
			<span className="ml-1">{detail}</span>
		</div>
	);
};

export default WeatherDetails;
