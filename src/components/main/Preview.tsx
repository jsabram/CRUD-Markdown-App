import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SectionHeader from '../reusable/SectionHeader';

const Preview = () => {
	const { selectedView } = useContext(AppContext);

	return (
		<section
			className={`h-full  ${
				selectedView === 'preview'
					? 'basis-full'
					: 'basis-1/2 md:border-l-[1px] md:border-textGray100 md:dark:border-lightGray100'
			} bg-yellow-200`}
		>
			<SectionHeader sectionTitle='Preview' />
		</section>
	);
};

export default Preview;
