import { IconButtonProps } from '../../@types/component-types';

const IconButton: React.FC<IconButtonProps> = ({
	children,
	className,
	onClick,
}) => {
	return (
		<button className={`icon-btn ${className}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default IconButton;
