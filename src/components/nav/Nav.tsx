import NavLink from './NavLink';

const dummyMenuLinks = [
	{
		id: 'document-one',
		docName: 'welcome.md',
	},
	{
		id: 'document-one',
		docName: 'welcome.md',
	},
];

const Nav = () => {
	return (
		<nav className='pe-4'>
			<ul className='flex'>
				{dummyMenuLinks.map((dummyLink, idx) => (
					<NavLink key={idx} id={dummyLink.id} docName={dummyLink.docName} />
				))}
			</ul>
		</nav>
	);
};

export default Nav;
