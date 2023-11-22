import { useState } from 'react';
import { AppContext } from './AppContext';
import { ChildrenProps, ChangeViewFn } from '../@types/component-types';

const AppContextProvider: React.FC<ChildrenProps> = ({ children }) => {
	const [isDarkThemed, setIsDarkThemed] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [areOptionsOpen, setAreOptionsOpen] = useState(false);
	const [selectedView, setSelectedView] = useState('editor');
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

	const openMenuHandler = () => {
		setIsMenuOpen(true);
	};

	const closeMenuHandler = () => {
		setIsMenuOpen(false);
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

	const openDeleteModalHandler = () => {
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModalHandler = () => {
		setIsDeleteModalOpen(false);
	};

	const openCreateModalHandler = () => {
		setIsCreateModalOpen(true);
	};

	const closeCreateModalHandler = () => {
		setIsCreateModalOpen(false);
	};

	return (
		<AppContext.Provider
			value={{
				isDarkThemed,
				toggleThemeHandler,
				isMenuOpen,
				toggleMenuHandler,
				openMenuHandler,
				closeMenuHandler,
				areOptionsOpen,
				toggleOptionsHandler,
				selectedView,
				changeViewHandler,
				isDeleteModalOpen,
				openDeleteModalHandler,
				closeDeleteModalHandler,
				isCreateModalOpen,
				openCreateModalHandler,
				closeCreateModalHandler,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
