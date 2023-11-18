import React from 'react';
import { AppContextProps } from '../@types/component-types';

export const AppContext = React.createContext<AppContextProps>({
	isDarkThemed: false,
	toggleThemeHandler: () => {},
});
