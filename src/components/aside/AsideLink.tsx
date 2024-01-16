import { useContext } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { setOpenDoc, updateActiveDocs } from '../../store/root-slice';
import { AppContext } from '../../context/AppContext';
import { LinkProps } from '../../@types/component-types';
import DocumentIcon from '../../assets/icons/icon-components/DocumentIcon';

const AsideLink: React.FC<LinkProps> = ({ id, title, docName }) => {
	const openDoc = useAppSelector((state) => state.openDoc);

	const { closeMenuHandler } = useContext(AppContext);

	const dispatch = useDispatch();

	const selectDocumentHandler = () => {
		closeMenuHandler();

		dispatch(setOpenDoc(id));
		dispatch(
			updateActiveDocs({
				id,
				title: docName,
			})
		);
	};

	return (
		<div
			className={`link-element document-link aside-link rounded-lg outline-none cursor-pointer transition-colors duration-300 ${
				id === openDoc && 'bg-darkGray100'
			}`}
			onClick={selectDocumentHandler}
			onKeyDown={(e) => {
				e.key === 'Enter' && selectDocumentHandler();
			}}
			tabIndex={0}
		>
			<div>
				<DocumentIcon className='link-icon' />
			</div>{' '}
			<div className='ms-3'>
				<h3>{title}</h3>
				<p className='text-white'>{docName}.md</p>
			</div>
		</div>
	);
};

export default AsideLink;
