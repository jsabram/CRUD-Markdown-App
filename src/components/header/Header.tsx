import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import IconButton from '../reusable/IconButton';
import ColoredButton from '../reusable/ColoredButton';
import MenuIcon from '../../assets/icons/menu-icon.svg';
import CloseIcon from '../../assets/icons/close-icon.svg';
import SaveIcon from '../../assets/icons/save-icon.svg';
import DeleteIcon from '../../assets/icons/icon-components/DeleteIcon';
import Nav from '../nav/Nav';

const Header = () => {
	const { isMenuOpen, toggleMenuHandler } = useContext(AppContext);

	const changeMenuHandler = () => {
		toggleMenuHandler();
	};

	const dummySaveChanges = () => {
		console.log('changes saved!');
	};

	const dummyDeleteDocument = () => {
		console.log('document deleted!');
	};

	return (
		<header
			className={`flex items-center justify-between pe-2 bg-darkGray200 transition-transform duration-300 lg:pe-4 ${
				isMenuOpen ? 'translate-x-[250px]' : 'translate-x-0'
			}`}
		>
			<div className='flex items-center'>
				<button
					className='flex justify-center items-center h-[55px] w-[55px] bg-darkGray100 outline-none transition-colors duration-300 hover:bg-primary focus:bg-primary  lg:h-[70px] lg:w-[70px]'
					onClick={changeMenuHandler}
				>
					{isMenuOpen ? (
						<img src={CloseIcon} alt='' />
					) : (
						<img src={MenuIcon} alt='' />
					)}
				</button>
				<Nav />
			</div>
			<div className='flex items-center'>
				<IconButton
					className='me-3 lg:me-4'
					onClick={dummyDeleteDocument}
				>
					<DeleteIcon />
				</IconButton>
				<ColoredButton
					onClick={dummySaveChanges}
					src={SaveIcon}
					text='Save Changes'
				/>
			</div>
		</header>
	);
};

export default Header;
