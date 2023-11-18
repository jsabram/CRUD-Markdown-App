import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import MenuIcon from '../../assets/icons/menu-icon.svg';
import CloseIcon from '../../assets/icons/close-icon.svg';

const Header = () => {
	const { isMenuOpen, toggleMenuHandler } = useContext(AppContext);
	
	const changeMenuHandler = () => {
		toggleMenuHandler();
	};

	return (
		<header className='bg-darkGray200'>
			<button
				className='flex justify-center items-center h-[55px] w-[55px] bg-darkGray100 outline-non transition-colors duration-300 hover:bg-primary focus:bg-primary'
				onClick={changeMenuHandler}
			>
				{isMenuOpen ? (
					<img src={CloseIcon} alt='' />
				) : (
					<img src={MenuIcon} alt='' />
				)}
			</button>
		</header>
	);
};

export default Header;
