import { ColoredButtonProps } from '../../@types/component-types';
import { gsap } from 'gsap';

const ColoredButton: React.FC<ColoredButtonProps> = ({
	id,
	onClick,
	text,
	src,
	className,
	disabled,
}) => {
	const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		const clickTopPosition = event.clientY - event.currentTarget.offsetTop;
		const clickLeftPosotion = event.clientX - event.currentTarget.offsetLeft;

		gsap.fromTo(
			`.btn-circle--${id}`,
			{
				top: clickTopPosition,
				left: clickLeftPosotion,
				y: '-50%',
				x: '-50%',
				scale: 0,
				opacity: 1,
			},
			{
				opacity: 0,
				scale: 2,
			}
		);

		onClick();
	};
	return (
		<button
			className={`relative flex items-center p-2 outline-none rounded-lg text-white tracking-wide overflow-hidden transition-colors duration-300 hover:bg-primaryHover focus:bg-primaryHover disabled:bg-darkGray100 disabled:cursor-not-allowed disabled:opacity-50 md:px-4 ${
				className && className
			} ${id === 'cancel' ? 'bg-darkGray100' : 'bg-primary'}`}
			onClick={clickHandler}
			disabled={disabled}
		>
			<img src={src} alt='' className='md:mr-2' />
			<span className={`hidden md:inline`}>{text}</span>
			<span
				className={`btn-circle--${id} absolute w-10 h-10 bg-primaryAccent rounded-full opacity-0`}
			></span>
		</button>
	);
};

export default ColoredButton;
