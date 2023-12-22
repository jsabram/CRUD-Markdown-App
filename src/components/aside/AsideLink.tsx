import { useAppSelector } from '../../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { setOpenDoc } from '../../store/root-slice';
import { LinkProps } from '../../@types/component-types';
import DocumentIcon from '../../assets/icons/icon-components/DocumentIcon';

const AsideLink: React.FC<LinkProps> = ({ id, title, docName }) => {
	const openDoc = useAppSelector((state) => state.openDoc);
	const dispatch = useDispatch();

	const selectDocumentHandler = () => {
		dispatch(setOpenDoc(id));
	};

	console.log(id === openDoc);
	console.log(openDoc);

	return (
		<div
			className={`link-element document-link aside-link rounded-lg outline-none cursor-pointer ${
				id === openDoc && 'bg-darkGray100'
			}`}
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
