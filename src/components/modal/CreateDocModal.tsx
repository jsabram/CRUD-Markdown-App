import { useState, useRef, useContext } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { useFirestore } from '../../hooks/useFirestore';
import { useMediaQuery } from '@uidotdev/usehooks';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import Modal from './Modal';
import ModalButtons from './ModalButtons';

const CreateDocModal = () => {
	const [title, setTitle] = useState('');
	const [isUnique, setIsUnique] = useState(false);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const { closeCreateModalHandler, closeMenuHandler } = useContext(AppContext);

	const userDocs = useAppSelector((state) => state.userDocs);

	const isLaptop = useMediaQuery('(min-width: 1200px)');

	const { createDocument } = useFirestore();

	const createDocumentHandler = () => {
		createDocument(title);
		setTitle('');
		setIsUnique(false);
		closeCreateModalHandler();
		closeMenuHandler();
	};

	const cancelHandler = () => {
		closeCreateModalHandler();
	};

	const nameHandler = () => {
		if (inputRef.current) {
			const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

			if (specialCharacters.test(inputRef.current.value)) {
				inputRef.current.value = inputRef.current.value.slice(0, -1);

				toast.warn('Special characters are not allowed');
				toast.clearWaitingQueue();
			}

			setTitle(inputRef.current.value);

			if (
				userDocs.find((doc) => doc.title === inputRef.current!.value.trim())
			) {
				setIsUnique(false);
			} else {
				setIsUnique(true);
			}
		}
	};

	return (
		<Modal
			title='Create a document'
			message={`Document name must be unique, without any special characters and consist of maximum 15 letters or numbers. ${
				isLaptop
					? 'You can later change it by double clicking on the active tab name.'
					: ''
			}`}
			onCancel={cancelHandler}
			onConfirm={createDocumentHandler}
		>
			<div className='relative mb-6'>
				<input
					id='documentTitle'
					ref={inputRef}
					type='text'
					className='title-input w-full py-2 px-2 bg-transparent border border-primary rounded-lg outline-none text-textGray200 caret-primary dark:text-textGray100'
					defaultValue={title}
					maxLength={15}
					required={true}
					onChange={nameHandler}
				/>
				<label
					htmlFor='documentTitle'
					className='title-label absolute top-2 left-1 px-1 rounded-lg text-textGray200 pointer-events-none dark:text-textGray100'
				>
					Document name
				</label>
			</div>

			<ModalButtons
				onCancel={cancelHandler}
				onConfirm={createDocumentHandler}
				disabled={title.trim().length === 0 || !isUnique}
			/>
		</Modal>
	);
};

export default CreateDocModal;
