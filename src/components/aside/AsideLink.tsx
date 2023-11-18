import { LinkProps } from '../../@types/component-types';
import DocumentIcon from '../../assets/icons/icon-components/DocumentIcon';

const AsideLink: React.FC<LinkProps> = ({ id, title, docName }) => {
	return (
		<a href={id} className='link-element document-link aside-link outline-none'>
			<DocumentIcon className='link-icon' />
			<div className='ms-3'>
				<h3>{title}</h3>
				<p>{docName}</p>
			</div>
		</a>
	);
};

export default AsideLink;
