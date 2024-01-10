import { useAppSelector } from '../../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { setActiveDocs, setOpenDoc } from '../../store/root-slice';
import { LinkProps } from '../../@types/component-types';
import DocumentIcon from '../../assets/icons/icon-components/DocumentIcon';
import IconButton from '../reusable/IconButton';
import CloseIcon from '../../assets/icons/icon-components/CloseIcon';

const NavLink: React.FC<LinkProps> = ({ id, docName }) => {
	const { openDoc, activeDocs } = useAppSelector((state) => ({
		openDoc: state.openDoc,
		activeDocs: state.activeDocs,
	}));

	const dispatch = useDispatch();

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

	return (
		<li
			className={`link-element transition-colors duration-300 border-l-[1px] md:border-textGray200 lg:px-5 ${
				id === openDoc && 'bg-darkGray100'
			}`}
		>
			<div
				className='document-link cursor-pointer'
				onClick={selectDocumentHandler}
			>
				<DocumentIcon className='link-icon' />
			</div>
			<div className='ms-3 w-max'>
				<h3 className='hidden lg:block'>Document name</h3>
				<p className='text-white'>{docName}</p>
			</div>
			<IconButton className='ms-3' onClick={closeTabHandler}>
				<CloseIcon />
			</IconButton>
		</li>
	);
};

export default NavLink;
