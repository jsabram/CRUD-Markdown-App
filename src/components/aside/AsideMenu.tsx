import { useContext } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { AppContext } from '../../context/AppContext';
import ColoredButton from '../reusable/ColoredButton';
import PencilIcon from '../../assets/icons/pencil-icon.svg';
import AsideLink from './AsideLink';
import ThemeToggler from './ThemeToggler';
import IconButton from '../reusable/IconButton';
import ViewOptions from './ViewOptions';

const AsideMenu = () => {
	const userDocs = useAppSelector((state) => state.userDocs);

	const {
		isMenuOpen,
		toggleOptionsHandler,
		openCreateModalHandler,
	} = useContext(AppContext);

	const createDocumentHandler = () => {
		openCreateModalHandler();
	};

	const viewOptionsHandler = () => {
		toggleOptionsHandler();
	};

	return (
		<aside
			className={`absolute top-0 bottom-0 left-0 w-[250px] py-4 px-4 bg-darkGray300 trasition-transform duration-300 lg:pt-6 ${
				isMenuOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			<h1 className='mb-2 text-lg text-white font-bold uppercase tracking-[5px] lg:mb-4'>
				Markdown
			</h1>
			<h2 className='mb-3 text-textGray200 uppercase tracking-widest lg:mb-6'>
				Documents
			</h2>
			<ColoredButton
				id='create'
				className='w-full justify-center'
				src={PencilIcon}
				onClick={createDocumentHandler}
				text='Create a document'
			/>
			{userDocs.length > 0 ? (
				<ul className='aside-links py-3 my-4 border-t-[1px] border-b-[1px] border-textGray200 overflow-y-scroll md:my-8'>
					{userDocs.map((userDoc) => (
						<AsideLink
							key={userDoc.id}
							id={userDoc.id}
							title={userDoc.createdAt}
							docName={userDoc.title}
						/>
					))}
				</ul>
			) : (
				<div className='mt-3 text-center'>
					<p className='text-textGray200'>
						Click on the above button to create a document
					</p>
				</div>
			)}
			<div className='absolute right-4 bottom-10 left-4 flex items-center justify-between'>
				<ThemeToggler />
				<IconButton className='relative' onClick={viewOptionsHandler}>
					<ViewOptions />
				</IconButton>
			</div>{' '}
		</aside>
	);
};

export default AsideMenu;
