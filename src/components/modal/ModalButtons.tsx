import { ModalButtonsProps } from '../../@types/component-types';
import ColoredButton from '../reusable/ColoredButton';
import CheckIcon from '../../assets/icons/check-icon.svg';
import CloseBtnIcon from '../../assets/icons/close-btn-icon.svg';

const ModalButtons: React.FC<ModalButtonsProps> = ({ onCancel, onConfirm }) => {
    const cancelHandler = () => {
        onCancel()
    };

    const confirmHandler = () => {
        onConfirm()
    };

	return (
		<div className='flex items-center justify-evenly'>
			<ColoredButton
				id='cancel'
				src={CloseBtnIcon}
				className='w-[100px] flex items-center justify-center md:w-[150px]'
				text='Cancel'
				onClick={cancelHandler}
			/>
			<ColoredButton
				id='confirm'
				src={CheckIcon}
				className='w-[100px] flex items-center justify-center md:w-[150px]'
				text='Confirm'
				onClick={confirmHandler}
			/>
		</div>
	);
};

export default ModalButtons;
