import { useEffect, useContext } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useSwipeable } from 'react-swipeable';
import { useTheme } from './hooks/useTheme';
import { AppContext } from './context/AppContext';
import Header from './components/header/Header';
import Main from './components/main/Main';
import AsideMenu from './components/aside/AsideMenu';

const App = () => {
	const {
		toggleThemeHandler,
		openMenuHandler,
		closeMenuHandler,
		changeViewHandler,
	} = useContext(AppContext);

	const isTablet = useMediaQuery('(min-width: 768px)');

	const swipeHandlers = useSwipeable({
		onSwipedRight: () => openMenuHandler(),
		onSwipedLeft: () => closeMenuHandler()
	});

	const checkThemeHandler = useTheme();

	useEffect(() => {
		const theme = checkThemeHandler();

		if (theme === 'dark') {
			toggleThemeHandler();
		}

		isTablet && changeViewHandler('comparison');
	}, []);

	return (
		<>
			<div
				className='overflow-hidden xxl:max-w-[2220px] xxl:mx-auto'
				{...swipeHandlers}
			>
				<Header />
				<Main />
				<AsideMenu />
			</div>
		</>
	);
};

export default App;
