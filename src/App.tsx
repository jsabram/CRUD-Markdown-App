import { useEffect, useContext } from 'react';
import { useTheme } from './hooks/useTheme';
import { AppContext } from './context/AppContext';
import Header from './components/header/Header';
import AsideMenu from './components/aside/AsideMenu';

const App = () => {
	const appCtx = useContext(AppContext);

	const checkThemeHandler = useTheme();

	useEffect(() => {
		const theme = checkThemeHandler();

		if (theme === 'dark') {
			appCtx.toggleThemeHandler();
		}
	}, []);

	return (
		<>
			<div className='overflow-hidden xxl:max-w-[2220px] xxl:mx-auto'>
				<Header />
				<AsideMenu />
			</div>
		</>
	);
};

export default App;
