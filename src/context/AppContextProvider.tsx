import { useState } from 'react';
import { AppContext } from './AppContext';
import { ChildrenProps } from '../@types/component-types';

const AppContextProvider: React.FC<ChildrenProps> = ({ children }) => {
	const [isDarkThemed, setIsDarkThemed] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [areOptionsOpen, setAreOptionsOpen] = useState(false);

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

	return (
		<AppContext.Provider
			value={{
				isDarkThemed,
				toggleThemeHandler,
				isMenuOpen,
				toggleMenuHandler,
				areOptionsOpen,
				toggleOptionsHandler,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
