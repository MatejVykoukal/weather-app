import { FC } from 'react';
import sprite from '../../svg/sprite.svg';

export type IconType =
	| '01'
	| '02'
	| '03'
	| '04'
	| '09'
	| '10'
	| '11'
	| '13'
	| '50';

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
