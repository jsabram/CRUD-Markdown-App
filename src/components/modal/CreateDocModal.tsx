import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Modal from './Modal';
import ModalButtons from './ModalButtons';

const CreateDocModal = () => {
	const { closeCreateModalHandler } = useContext(AppContext);

	const createDocumentHandler = () => {
		console.log('Create document');
		closeCreateModalHandler();
	};

	const cancelHandler = () => {
		closeCreateModalHandler();
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
			/>
		</Modal>
	);
};

export default CreateDocModal;
