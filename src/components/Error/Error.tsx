import { FC } from 'react';

interface IconProps {
	message?: string;
}

const Error: FC<IconProps> = ({ message }) => {
	const defaultMessage =
		'We are sorry! <br /> Our application is not available at the moment. Please try it again in few minutes.';

	return (
		<p className="text-2xl container text-center text-red-600">
			{message ? message : defaultMessage}
		</p>
	);
};

export default Error;
