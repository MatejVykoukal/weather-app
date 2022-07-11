import { FC } from 'react';
import sprite from '../../svg/sprite.svg';

// TODO: Convert API Icon code types('01','02',...) to enums to be more clear to developers, what icons they represent.
export type IconType =
	| '01'
	| '02'
	| '03'
	| '04'
	| '09'
	| '10'
	| '11'
	| '13'
	| '50'
	| 'humidity'
	| 'pressure'
	| 'location'
	| 'chevron-left';

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
