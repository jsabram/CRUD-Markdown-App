import { useState } from 'react';
import { AppContext } from './AppContext';
import { ChildrenProps, ChangeViewFn } from '../@types/component-types';

const AppContextProvider: React.FC<ChildrenProps> = ({ children }) => {
	const [isDarkThemed, setIsDarkThemed] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [areOptionsOpen, setAreOptionsOpen] = useState(false);
	const [selectedView, setSelectedView] = useState('editor');

	const toggleThemeHandler = () => {
		setIsDarkThemed((prevState) => {
			return !prevState;
		});
		document.documentElement.classList.toggle('dark');
	};

	const toggleMenuHandler = () => {
		setIsMenuOpen((prevState) => {
			return !prevState;
		});
		setAreOptionsOpen(false);
	};

	const toggleOptionsHandler = () => {
		setAreOptionsOpen((prevState) => {
			return !prevState;
		});
	};

	const changeViewHandler: ChangeViewFn = (value) => {
		setSelectedView(value);
	};

	return (
		<AppContext.Provider
			value={{
				isDarkThemed,
				toggleThemeHandler,
				isMenuOpen,
				toggleMenuHandler,
				areOptionsOpen,
				toggleOptionsHandler,
				selectedView,
				changeViewHandler,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
