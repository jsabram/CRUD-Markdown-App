import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import ThemeToggler from './ThemeToggler';

const AsideMenu = () => {
	const { isMenuOpen } = useContext(AppContext);

	return (
		<aside
			className={`fixed top-0 bottom-0 left-0 w-[250px] py-2 px-4 bg-darkGray300 trasition-transform duration-300 lg:py-3 ${
				isMenuOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			<h1 className='text-lg text-lightGray100 font-bold uppercase tracking-widest'>
				Markdown Editor
			</h1>
			<ThemeToggler />
		</aside>
	);
};

export default AsideMenu;
