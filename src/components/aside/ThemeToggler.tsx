import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SunIcon from '../../assets/icons/icon-components/SunIcon';
import MoonIcon from '../../assets/icons/icon-components/MoonIcon';

const ThemeToggler = () => {
	const { isDarkThemed, toggleThemeHandler } = useContext(AppContext);

	const changeThemeHandler = () => {
		toggleThemeHandler();
	};

	return (
		<div className='flex items-end justify-between w-28'>
			<SunIcon className={!isDarkThemed ? 'icon-active' : ''} />
			<button
				className='relative w-12 h-6 bg-lightGray100 outline-none rounded-xl transition-colors duration-300 hover:bg-primary focus:bg-primary'
				onClick={changeThemeHandler}
			>
				<span
					className={`absolute top-1 block w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
						!isDarkThemed ? 'translate-x-1' : 'translate-x-7'
					}`}
				></span>
			</button>
			<MoonIcon className={isDarkThemed ? 'icon-active' : ''} />
		</div>
	);
};

export default ThemeToggler;
