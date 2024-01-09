import { useAppSelector } from '../../store/typed-hooks';
import NavLink from './NavLink';

const Nav = () => {
	const activeDocs = useAppSelector((state) => state.activeDocs);

	return (
		<nav className='pe-4'>
			<ul className='flex'>
				{activeDocs.map((doc) => (
					<NavLink key={doc.id} id={doc.id} docName={doc.title} />
				))}
			</ul>
		</nav>
	);
};

export default Nav;
