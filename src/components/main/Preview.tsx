import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SectionHeader from '../reusable/SectionHeader';

const Preview = () => {
	const { selectedView } = useContext(AppContext);

	return (
		<section
			className={`relative h-full bg-white dark:bg-darkGray500 ${
				selectedView === 'preview' ? 'w-full' : 'w-1/2'
			}`}
		>
			<SectionHeader sectionTitle='Preview' />
			<div className='h-full px-4 pt-10 pb-2 font-preview overflow-y-scroll'></div>
		</section>
	);
};

export default Preview;
