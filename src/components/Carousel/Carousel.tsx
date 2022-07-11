import Glide from '@glidejs/glide';
import React, { useEffect } from 'react';

interface Props {
	id: string;
	children?: React.ReactNode;
}

const Carousel: React.FC<Props> = ({ children, id }) => {
	useEffect(() => {
		new Glide(`#${id}`, {
			type: 'slider',
			startAt: 0,
			bound: true,
			rewind: false,
			perView: 2.5,
			perTouch: 1,
		}).mount();
	}, [id]);

	return (
		<div className="py-8 glide cursor-grab" id={id}>
			<div className="glide__track" data-glide-el="track">
				<ul className="glide__slides ">{children}</ul>
			</div>
		</div>
	);
};

export default Carousel;
