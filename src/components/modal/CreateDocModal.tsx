import { useState, useContext } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { AppContext } from '../../context/AppContext';
import Modal from './Modal';
import ModalButtons from './ModalButtons';

const CreateDocModal = () => {
	const [title, setTitle] = useState('');

	const { closeCreateModalHandler } = useContext(AppContext);

	const { createDocument } = useFirestore();

	const createDocumentHandler = () => {
		createDocument(title);
		setTitle('');
		closeCreateModalHandler();
	};

	const cancelHandler = () => {
		closeCreateModalHandler();
	};

	const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	return (
		<Modal
			title='Create a document'
			message={`Submit a name for the new document. You can later change it by double clicking on the tab title.`}
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
				disabled={title.trim().length === 0}
			/>
		</Modal>
	);
};

export default CreateDocModal;
