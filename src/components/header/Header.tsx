import { useContext } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { setSavedValue } from '../../store/root-slice';
import { useFirestore } from '../../hooks/useFirestore';
import { AppContext } from '../../context/AppContext';
import IconButton from '../reusable/IconButton';
import ColoredButton from '../reusable/ColoredButton';
import MenuIcon from '../../assets/icons/menu-icon.svg';
import CloseIcon from '../../assets/icons/close-icon.svg';
import SaveIcon from '../../assets/icons/save-icon.svg';
import DeleteIcon from '../../assets/icons/icon-components/DeleteIcon';
import DownloadIcon from '../../assets/icons/download-icon.svg';
import Nav from '../nav/Nav';

const Header = () => {
	const { editorValue, savedValue, openDoc, userDocs } = useAppSelector(
		(state) => ({
			editorValue: state.editorValue,
			savedValue: state.savedValue,
			openDoc: state.openDoc,
			userDocs: state.userDocs,
		})
	);

	const { isMenuOpen, toggleMenuHandler, openDeleteModalHandler } = useContext(
		AppContext
	);

	const dispatch = useDispatch();

	const { saveDocument } = useFirestore();

	const changeMenuHandler = () => {
		toggleMenuHandler();
	};

	const saveChangesHandler = () => {
		dispatch(setSavedValue(editorValue));
		saveDocument(openDoc, editorValue);
	};

	const downloadFileHandler = () => {
		const downloadedFile = userDocs.find((doc) => doc.id === openDoc);

		if (downloadedFile) {
			const file = new Blob([downloadedFile.body], { type: 'text/plain' });

			const anchor = document.createElement('a');
			anchor.href = URL.createObjectURL(file);
			anchor.download = `${downloadedFile.title}.md`;

			document.body.appendChild(anchor);
			anchor.click();
		}
	};

	const openModalHandler = () => {
		openDeleteModalHandler();
	};

	return (
		<header
			className={`flex items-center justify-between pe-2 bg-darkGray200 transition-transform duration-300 lg:pe-4 ${
				isMenuOpen ? 'translate-x-[250px]' : 'translate-x-0'
			}`}
		>
			<div className='flex items-center'>
				<button
					className='flex justify-center items-center h-[55px] w-[55px] bg-darkGray100 outline-none transition-colors duration-300 hover:bg-primary focus:bg-primary  lg:h-[70px] lg:w-[70px]'
					onClick={changeMenuHandler}
				>
					{isMenuOpen ? (
						<img src={CloseIcon} alt='' />
					) : (
						<img src={MenuIcon} alt='' />
					)}
				</button>
				<Nav />
			</div>
			<div className='flex items-center'>
				{openDoc && (
					<>
						<IconButton className='me-3 lg:me-4' onClick={openModalHandler}>
							<DeleteIcon />
						</IconButton>
						<ColoredButton
							id='save'
							onClick={
								editorValue === savedValue
									? downloadFileHandler
									: saveChangesHandler
							}
							src={editorValue === savedValue ? DownloadIcon : SaveIcon}
							text={editorValue === savedValue ? 'Download' : 'Save Changes'}
						/>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
