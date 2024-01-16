import { useEffect } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { useMediaQuery } from '@uidotdev/usehooks';
import NavLink from './NavLink';

const Nav = () => {
	const { activeDocs, openDoc } = useAppSelector((state) => ({
		activeDocs: state.activeDocs,
		openDoc: state.openDoc,
	}));

	const isMobile = useMediaQuery('(max-width: 768px)');
	const isTablet = useMediaQuery('(min-width: 768px)');

	useEffect(() => {
		const activeTab = document.getElementById(openDoc);

		if (activeTab) {
			activeTab.scrollIntoView({ behavior: 'smooth' });
		}
	}, [openDoc]);

	return (
		<nav className='nav w-full pe-4 overflow-y-hidden overflow-x-scroll ]'>
			<ul className='flex h-[55px] lg:h-[70px]'>
				{isMobile &&
					activeDocs.map(
						(doc) =>
							doc.id === openDoc && (
								<NavLink key={doc.id} id={doc.id} docName={doc.title} />
							)
					)}
				{isTablet &&
					activeDocs.map((doc) => (
						<NavLink key={doc.id} id={doc.id} docName={doc.title} />
					))}
			</ul>
		</nav>
	);
};

export default Nav;
