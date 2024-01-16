import { useLayoutEffect } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { gsap } from 'gsap';

const LoadingBar = () => {
	const isMobile = useMediaQuery('(max-width: 768px)');

	useLayoutEffect(() => {
		gsap.fromTo(
			'.loading-bar',
			{ x: '0' },
			{
				x: '100vw',
				duration: isMobile ? 2.5 : 5,
				repeat: -1,
			}
		);
	}, []);

	return (
		<div
			className={`fixed top-0 right-0 left-0 bg-transparent ${
				isMobile ? 'h-[2px]' : 'h-[5px'
			}`}
		>
			<div className={`loading-bar h-full bg-primary ${isMobile ? 'w-28' : 'w-40'}`}></div>
		</div>
	);
};

export default LoadingBar;
