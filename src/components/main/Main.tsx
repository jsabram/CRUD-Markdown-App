import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Editor from './Editor';
import Preview from './Preview';

const Main = () => {
	const { isMenuOpen, closeMenuHandler, selectedView } = useContext(AppContext);

	const hideMenuHandler = () => {
		closeMenuHandler();
	};

	return (
		<main
			className={`flex transition-transform duration-300 bg-red-100 ${
				isMenuOpen ? 'translate-x-[250px]' : 'translate-x-0'
			}`}
			onClick={hideMenuHandler}
		>
			{selectedView === 'editor' && <Editor />}
			{selectedView === 'preview' && <Preview />}
			{selectedView === 'comparison' && (
				<>
					<Editor />
					<Preview />
				</>
			)}
		</main>
	);
};

export default Main;
