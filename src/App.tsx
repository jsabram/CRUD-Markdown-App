import { useEffect, useContext } from 'react';
import { useTheme } from './hooks/useTheme';
import { AppContext } from './context/AppContext';
import Header from './components/header/Header';

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
			<Header />
		</>
	);
};

export default App;
