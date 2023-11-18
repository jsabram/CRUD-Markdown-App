import { useState } from 'react';
import { AppContext } from './AppContext';
import { ChildrenProps } from '../types/component-types';

const AppContextProvider: React.FC<ChildrenProps> = ({ children }) => {
	const [isLightThemed, setIsLightThemed] = useState(false);

	const toggleThemeHandler = () => {
		setIsLightThemed((prevState) => {
			return !prevState;
		});
		document.documentElement.classList.toggle('dark');
	};

	return (
		<AppContext.Provider value={{ isLightThemed, toggleThemeHandler }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
