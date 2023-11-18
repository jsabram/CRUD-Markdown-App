import { LinkProps } from '../../@types/component-types';
import DocumentIcon from '../../assets/icons/icon-components/DocumentIcon';

const NavLink: React.FC<LinkProps> = ({ id, title, docName }) => {
	return (
		<li className='link-element md:border-r-[1px] md:border-textGray200 lg:px-5'>
			<a href={id} className='document-link'>
				<DocumentIcon className='link-icon' />
			</a>
			<div className='ms-3'>
				<h3 className='hidden lg:block'>Document name</h3>
				<p>{docName}</p>
			</div>
		</li>
	);
};

export default NavLink;
