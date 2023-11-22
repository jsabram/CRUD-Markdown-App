import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Modal from './Modal';
import ModalButtons from './ModalButtons';

const DeleteDocModal = () => {
	const { closeDeleteModalHandler } = useContext(AppContext);

	const deleteDocumentHandler = () => {
		console.log('Delete document');
		closeDeleteModalHandler();
	};

	const cancelHandler = () => {
		closeDeleteModalHandler();
	};

	return (
		<Modal
			title='Delete this document?'
			message={`Are you sure you want to delete the 'welcome.md' document? This action cannot be undone.`}
			onCancel={cancelHandler}
			onConfirm={deleteDocumentHandler}
		>
			<ModalButtons
				onCancel={cancelHandler}
				onConfirm={deleteDocumentHandler}
			/>
		</Modal>
	);
};

export default DeleteDocModal;
