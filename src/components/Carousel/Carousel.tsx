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
			rewind: true,
			perView: 2.5,
			perTouch: 2,
			breakpoints: {
				576: {
					perView: 1.5,
				},
			},
		}).mount();
	}, [id]);

	return (
		<div className="py-8 glide" id={id}>
			<div className="glide__track" data-glide-el="track">
				<ul className="glide__slides cursor-grab">{children}</ul>
			</div>
		</div>
	);
};

export default Carousel;
