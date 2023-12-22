import { useContext } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { AppContext } from '../../context/AppContext';
import Editor from './Editor';
import Preview from './Preview';

const Main = () => {
	const userDocs = useAppSelector((state) => state.userDocs);

	const { isMenuOpen, closeMenuHandler, selectedView } = useContext(AppContext);

	const hideMenuHandler = () => {
		closeMenuHandler();
	};

	return (
		<main
			className={`flex bg-white transition-transform duration-300 dark:bg-darkGray500 ${
				isMenuOpen ? 'translate-x-[250px]' : 'translate-x-0'
			}`}
			onClick={hideMenuHandler}
		>
			{userDocs.length > 0 && selectedView === 'editor' && <Editor />}
			{userDocs.length > 0 && selectedView === 'preview' && <Preview />}
			{userDocs.length > 0 && selectedView === 'comparison' && (
				<>
					<Editor />
					<Preview />
				</>
			)}
			{userDocs.length === 0} {}
		</main>
	);
};

export default Main;
