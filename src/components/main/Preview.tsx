import { useContext } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { AppContext } from '../../context/AppContext';
import SectionHeader from '../reusable/SectionHeader';
import Markdown from 'react-markdown';

const Preview = () => {
	const { selectedView } = useContext(AppContext);

	const markdown = useAppSelector((state) => state.editorValue);
	
	return (
		<section
			className={`relative h-full bg-white dark:bg-darkGray500 ${
				selectedView === 'preview' ? 'w-[100vw]' : 'w-full'
			}`}
		>
			<SectionHeader sectionTitle='Preview' />
			<Markdown className='preview h-full px-8 pt-10 pb-2 text-darkGray200 font-preview overflow-y-scroll dark:text-textGray100'>
				{markdown}
			</Markdown>
		</section>
	);
};

export default Preview;
