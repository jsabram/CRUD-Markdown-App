import { useContext } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { AppContext } from '../../context/AppContext';
import Editor from './Editor';
import Preview from './Preview';
import ErrorIcon from '../../assets/icons/icon-components/ErrorIcon';

const Main = () => {
	const { userDocs, openDoc, appState } = useAppSelector((state) => ({
		userDocs: state.userDocs,
		openDoc: state.openDoc,
		appState: state.appState,
	}));

	const { isMenuOpen, closeMenuHandler, selectedView } = useContext(AppContext);

	const hideMenuHandler = () => {
		closeMenuHandler();
	};

	return (
		<main
			className={`flex bg-white transition-transform duration-300 dark:bg-darkGray500 ${
				isMenuOpen ? 'translate-x-[250px]' : 'translate-x-0'
			} ${appState === 'error' ? 'justify-center items-center' : ''}`}
			onClick={hideMenuHandler}
		>
			{appState === 'error' && (
				<div className='w-[300px] h-[300px]'>
					<ErrorIcon />
					<p className='mt-2 text-textGray200 text-center'>
						Error status code: 500
					</p>
				</div>
			)}
			{appState === 'success' && openDoc && (
				<>
					{userDocs.length > 0 && selectedView === 'editor' && <Editor />}
					{userDocs.length > 0 && selectedView === 'preview' && <Preview />}
					{userDocs.length > 0 && selectedView === 'comparison' && (
						<>
							<Editor />
							<Preview />
						</>
					)}
				</>
			)}
			{appState === 'success' && !openDoc && (
				<div className='flex items-center justify-center w-full px-5 text-center'>
					<p className='text-textGray200'>
						Select or create a document to edit and preview its content.
					</p>
				</div>
			)}
		</main>
	);
};

export default Main;
