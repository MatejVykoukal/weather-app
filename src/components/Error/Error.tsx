import { FC } from 'react';

interface IconProps {
	extraMessage?: string;
}

const Error: FC<IconProps> = ({ extraMessage }) => {
	return (
		<p className="text-2xl container text-center text-red-600">
			We are sorry! <br /> Our application is not available at the moment.
			Please try it again in few minutes. <br /> {extraMessage}
		</p>
	);
};

export default Error;
