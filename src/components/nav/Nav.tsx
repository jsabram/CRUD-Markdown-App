import { useEffect } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { setActiveDocs } from '../../store/root-slice';
import NavLink from './NavLink';

const Nav = () => {
	const activeDocs = useAppSelector((state) => state.activeDocs);
	const usersDocs = useAppSelector((state) => state.userDocs);
	const openDoc = useAppSelector((state) => state.openDoc)

	const dispatch = useDispatch();

	useEffect(() => {
		
		// console.log(localStorage.getItem('activeDocs'));
		// console.log(activeDocs);
	}, []);

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
