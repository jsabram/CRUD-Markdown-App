import { IconButtonProps } from '../../@types/component-types';

const IconButton: React.FC<IconButtonProps> = ({
	className,
	onClick,
	children,
}) => {
	return (
		<button className={`icon-btn outline-none ${className}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default IconButton;
