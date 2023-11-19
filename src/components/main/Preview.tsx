import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SectionHeader from '../reusable/SectionHeader';

const Preview = () => {
	const { selectedView } = useContext(AppContext);

	return (
		<section
			className={`relative h-full bg-white ${
				selectedView === 'preview'
					? 'basis-full'
					: 'basis-1/2 md:border-l-[1px] md:border-textGray100 md:dark:border-lightGray100'
			} dark:bg-darkGray500`}
		>
			<SectionHeader sectionTitle='Preview' />
			<div className='h-full px-4 pt-10 pb-2 font-preview overflow-y-scroll'>
			</div>
		</section>
	);
};

export default Preview;
