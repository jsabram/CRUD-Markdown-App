import { useState } from 'react';
import { AppContext } from './AppContext';
import { ChildrenProps } from '../@types/component-types';

const AppContextProvider: React.FC<ChildrenProps> = ({ children }) => {
	const [isDarkThemed, setIsDarkThemed] = useState(false);

	const toggleThemeHandler = () => {
		setIsDarkThemed((prevState) => {
			return !prevState;
		});
		document.documentElement.classList.toggle('dark');
	};

	return (
		<AppContext.Provider value={{ isDarkThemed, toggleThemeHandler }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
