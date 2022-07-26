import { FC } from 'react';
import sprite from '../../svg/sprite.svg';
import { IApiWeatherIcons } from '../../types/weather';

export const ApiWeatherIconCodes = {
	'01': 'clear-sky',
	'02': 'few-clouds',
	'03': 'clouds',
	'04': 'broken-clouds',
	'09': 'shower-rain',
	'10': 'rain',
	'11': 'thunderstorm',
	'13': 'snow',
	'50': 'mist',
} as const;

// TODO: Convert API Icon code types('01','02',...) to enums to be more clear to developers, what icons they represent.
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
