import { FC } from 'react';
import sprite from '../../svg/sprite.svg';
import { IApiWeatherIcons } from '../../types/weather';

export type IconType =
	| IApiWeatherIcons
	| 'humidity'
	| 'pressure'
	| 'location'
	| 'chevron-left'
	| 'text';

interface IconProps {
	icon: IconType;
	size?: number;
	color?: string;
}

const Icon: FC<IconProps> = ({ icon, size = '32', color = 'currentColor' }) => {
	return (
		<svg width={size} height={size} fill={color}>
			<use href={`${sprite}#${icon}`}> </use>
		</svg>
	);
};

export default Icon;
