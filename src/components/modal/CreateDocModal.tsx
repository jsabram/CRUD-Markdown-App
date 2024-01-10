import { useState, useContext } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { useFirestore } from '../../hooks/useFirestore';
import { AppContext } from '../../context/AppContext';
import Modal from './Modal';
import ModalButtons from './ModalButtons';

const CreateDocModal = () => {
	const [title, setTitle] = useState('');
	const [isUnique, setIsUnique] = useState(false);

	const { closeCreateModalHandler } = useContext(AppContext);

	const userDocs = useAppSelector((state) => state.userDocs);

	const { createDocument } = useFirestore();

	const createDocumentHandler = () => {
		createDocument(title);
		setTitle('');
		setIsUnique(false);
		closeCreateModalHandler();
	};

	const cancelHandler = () => {
		closeCreateModalHandler();
	};

	const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);

		if (userDocs.find((doc) => doc.title === event.target.value.trim())) {
			setIsUnique(false);
		} else {
			setIsUnique(true);
		}
	};

	return (
		<Modal
			title='Create a document'
			message={`Create a name for the new document. It has to be unique and consist of maximum 20 letters. You can later change it by double clicking on the active tab name.`}
			onCancel={cancelHandler}
			onConfirm={createDocumentHandler}
		>
			<div className='relative mb-6'>
				<input
					id='documentTitle'
					type='text'
					className='title-input w-full py-2 px-2 bg-transparent border border-primary rounded-lg outline-none text-textGray200 caret-primary dark:text-textGray100'
					value={title}
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
