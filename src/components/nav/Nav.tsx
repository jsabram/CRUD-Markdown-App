import { useAppSelector } from '../../store/typed-hooks';
import NavLink from './NavLink';

const Nav = () => {
	const userDocs = useAppSelector((state) => state.userDocs);
	const openDocsArray = userDocs;

	return (
		<nav className='pe-4'>
			<ul className='flex'>
				{openDocsArray.map((doc) => (
					<NavLink key={doc.id} id={doc.id} docName={doc.title} />
				))}
			</ul>
		</nav>
	);
};

export default Nav;
