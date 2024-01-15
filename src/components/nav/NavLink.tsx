import { useState, useRef } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useFirestore } from '../../hooks/useFirestore';
import { setActiveDocs, setOpenDoc } from '../../store/root-slice';
import { LinkProps } from '../../@types/component-types';
import DocumentIcon from '../../assets/icons/icon-components/DocumentIcon';
import IconButton from '../reusable/IconButton';
import CloseIcon from '../../assets/icons/icon-components/CloseIcon';

const NavLink: React.FC<LinkProps> = ({ id, docName }) => {
	const [documentName, setDocumentName] = useState(docName);
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState('');

	const inputRef = useRef<HTMLInputElement | null>(null);

	const { openDoc, activeDocs } = useAppSelector((state) => ({
		openDoc: state.openDoc,
		activeDocs: state.activeDocs,
	}));

	const dispatch = useDispatch();

	const isLaptop = useMediaQuery('(min-width: 1000px)');

	const { updateDocTitle } = useFirestore();

	const selectDocumentHandler = () => {
		dispatch(setOpenDoc(id));
	};

	const closeTabHandler = () => {
		const docToClose = activeDocs.findIndex((doc) => doc.id === id);
		const updatedArray = activeDocs.filter((doc) => doc.id !== id);

		dispatch(setActiveDocs(updatedArray));

		if (id === openDoc) {
			if (updatedArray.length > 1) {
				dispatch(setOpenDoc(updatedArray[docToClose].id));
			} else if (updatedArray.length === 1) {
				dispatch(setOpenDoc(updatedArray[0].id));
			} else {
				dispatch(setOpenDoc(''));
			}
		}
	};

	const openEditInputHandler = (event: React.MouseEvent) => {
		if (event.detail === 2 && isLaptop) {
			setIsEditing(true);
			setEditedName(documentName);
		}
	};

	const updateNameHandler = () => {
		const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

		if (inputRef.current) {
			if (specialCharacters.test(inputRef.current.value)) {
				console.log('No special chars');
				inputRef.current.value = inputRef.current.value.slice(0, -1);
				return;
			} else {
				setEditedName(inputRef.current.value);
			}
		}
	};

	const closeEditInputHandler = () => {
		if (editedName.trim().length > 0) {
			updateDocTitle(id, editedName);
			setDocumentName(editedName);
		}

		setIsEditing(false);
	};

	const updateNameOnEnterHandler = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			closeEditInputHandler();
		} else {
			return;
		}
	};

	return (
		<li className='nav-link link-element overflow-scroll bg-darkGray200 border-l-[1px] transition-colors duration-300 md:border-textGray200 md:overflow-visible lg:px-5'>
			<div
				className='document-link cursor-pointer'
				onClick={selectDocumentHandler}
			>
				<DocumentIcon className='link-icon' />
			</div>
			<div className='ms-3 w-max'>
				<h3 className='hidden lg:block'>Document name</h3>
				{isEditing ? (
					<input
						id='edit_name'
						className='relative w-full py-1 px-2 bg-transparent border border-primary rounded-lg outline-none text-sm text-textGray200 caret-primary dark:text-textGray100'
						ref={inputRef}
						maxLength={15}
						autoFocus={isEditing}
						defaultValue={documentName}
						onChange={updateNameHandler}
						onKeyDown={updateNameOnEnterHandler}
						onBlur={closeEditInputHandler}
					/>
				) : (
					<p
						className={id === openDoc ? 'text-primary' : 'text-white'}
						onClick={openEditInputHandler}
					>
						{documentName}.md
					</p>
				)}
			</div>
			<IconButton className='ms-3' onClick={closeTabHandler}>
				<CloseIcon />
			</IconButton>
		</li>
	);
};

export default NavLink;
