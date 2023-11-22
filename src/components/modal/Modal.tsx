import { ModalProps } from '../../@types/component-types';
import ModalBackground from './ModalBackground';
import ModalMessage from './ModalMessage';

const Modal: React.FC<ModalProps> = ({
	title,
	message,
	children,
	onCancel,
	onConfirm,
}) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-30'>
			<ModalBackground onCancel={onCancel} />
			<ModalMessage title={title} message={message} onConfirm={onConfirm}>
				{children}
			</ModalMessage>
		</div>
	);
};

export default Modal;
