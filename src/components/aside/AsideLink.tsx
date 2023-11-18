import { LinkProps } from '../../@types/component-types';
import DocumentIcon from '../../assets/icons/document-icon.svg';

const AsideLink: React.FC<LinkProps> = ({ id, title, docName }) => {
	return (
		<a href={id} className='flex items-centerw-full py-2 outline-none'>
			<img src={DocumentIcon} alt='' className='me-3' />
			<div>
				<h3 className='text-sm text-textGray200'>{title}</h3>
				<p className='text-white transition-colors duration-300'>{docName}</p>
			</div>
		</a>
	);
};

export default AsideLink;
