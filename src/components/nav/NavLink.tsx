import { LinkProps } from '../../@types/component-types';
import DocumentIcon from '../../assets/icons/icon-components/DocumentIcon';
import IconButton from '../reusable/IconButton';
import CloseIcon from '../../assets/icons/icon-components/CloseIcon';

const NavLink: React.FC<LinkProps> = ({ id, docName }) => {
	const closeTabHandler = () => {
		console.log('Tab closed');
	};

	return (
		<li className='link-element md:border-r-[1px] md:border-textGray200 lg:px-5'>
			<a href={id} className='document-link outline-none'>
				<DocumentIcon className='link-icon' />
			</a>
			<div className='ms-3'>
				<h3 className='hidden lg:block'>Document name</h3>
				<p>{docName}</p>
			</div>
			<IconButton className='ms-3' onClick={closeTabHandler}>
				<CloseIcon />
			</IconButton>
		</li>
	);
};

export default NavLink;
