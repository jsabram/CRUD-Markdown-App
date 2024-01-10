import { useContext } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { AppContext } from '../../context/AppContext';
import { useFirestore } from '../../hooks/useFirestore';
import Modal from './Modal';
import ModalButtons from './ModalButtons';

const DeleteDocModal = () => {
	const openDoc = useAppSelector((state) => state.openDoc);
	const userDoc = useAppSelector((state) => state.userDocs);

	const docToDelete = userDoc.find((doc) => doc.id === openDoc);

	const { closeDeleteModalHandler } = useContext(AppContext);

	const { deleteDocument } = useFirestore();

	const deleteDocumentHandler = () => {
		deleteDocument(openDoc);
		closeDeleteModalHandler();
	};

	const cancelHandler = () => {
		closeDeleteModalHandler();
	};

	return (
		<Modal
			title='Delete this document?'
			message={`Are you sure you want to delete the '${
				docToDelete!.title
			}.md' document? This action cannot be reversed.`}
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
