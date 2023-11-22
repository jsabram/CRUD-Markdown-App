import { ModalBackgroundProps } from '../../@types/component-types';

const ModalBackground: React.FC<ModalBackgroundProps> = ({ onCancel }) => {
	return (
		<div
			className='fixed h-full w-full bg-modalBackdropLight dark:bg-modalBackdropDark'
			onClick={onCancel}
		></div>
	);
};

export default ModalBackground;
