import { IconButtonProps } from '../../@types/component-types';

const IconButton: React.FC<IconButtonProps> = ({
	className,
	onClick,
	tooltipText,
	children,
}) => {
	return (
		<button className={`icon-btn relative ${className}`} onClick={onClick}>
			{children}
			<span className='tooltip absolute top-[140%] left-1/2 hidden py-1 px-3 bg-lightGray100 text-white text-xs tracking-wide -translate-x-1/2 opacity-0 transition-opacity duration-300 delay-700 z-10 lg:inline'>
				{tooltipText}
			</span>
		</button>
	);
};

export default IconButton;
