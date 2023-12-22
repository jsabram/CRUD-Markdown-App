import { useDispatch } from 'react-redux';
import { setOpenDoc } from '../../store/root-slice';
import { LinkProps } from '../../@types/component-types';
import DocumentIcon from '../../assets/icons/icon-components/DocumentIcon';

const AsideLink: React.FC<LinkProps> = ({ id, title, docName }) => {
	const dispatch = useDispatch();

	const selectDocumentHandler = () => {
		dispatch(setOpenDoc(id));
	};

	return (
		<div
			className='link-element document-link aside-link outline-none cursor-pointer'
			onClick={selectDocumentHandler}
		>
			<DocumentIcon className='link-icon' />
			<div className='ms-3'>
				<h3>{title}</h3>
				<p>{docName}.md</p>
			</div>
		</div>
	);
};

export default AsideLink;
