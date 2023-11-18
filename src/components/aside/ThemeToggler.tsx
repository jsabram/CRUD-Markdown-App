import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const ThemeToggler = () => {
	const {isLightThemed, toggleThemeHandler} = useContext(AppContext);

	const changeThemeHandler = () => {
		toggleThemeHandler();
	};

	return (
		<button
			className='relative w-12 h-6 bg-lightGray100 outline-none rounded-xl transition-colors duration-300 hover:bg-primaryHover focus:bg-primaryHover'
			onClick={changeThemeHandler}
		>
			<span
				className={`absolute top-1 block w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
					!isLightThemed ? 'translate-x-1' : 'translate-x-7'
				}`}
			></span>
		</button>
	);
};

export default ThemeToggler;
