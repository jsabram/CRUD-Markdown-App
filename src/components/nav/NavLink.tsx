import { useAppSelector } from '../../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { setOpenDoc } from '../../store/root-slice';
import { LinkProps } from '../../@types/component-types';
import DocumentIcon from '../../assets/icons/icon-components/DocumentIcon';
import IconButton from '../reusable/IconButton';
import CloseIcon from '../../assets/icons/icon-components/CloseIcon';

const NavLink: React.FC<LinkProps> = ({ id, docName }) => {
	const openDoc = useAppSelector((state) => state.openDoc);

	const dispatch = useDispatch();

	const selectDocumentHandler = () => {
		dispatch(setOpenDoc(id));
	};

	const closeTabHandler = () => {
		console.log('Tab closed');
	};

	return (
		<li className='link-element md:border-r-[1px] md:border-textGray200 lg:px-5'>
			<div
				className='document-link cursor-pointer'
				onClick={selectDocumentHandler}
			>
				<DocumentIcon className='link-icon' />
			</div>
			<div className='ms-3'>
				<h3 className='hidden lg:block'>Document name</h3>
				<p className={id === openDoc ? 'text-primary' : 'text-white'}>
					{docName}
				</p>
			</div>
			<IconButton className='ms-3' onClick={closeTabHandler}>
				<CloseIcon />
			</IconButton>
		</li>
	);
};

export default NavLink;
