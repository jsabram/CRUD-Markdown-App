import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SectionHeader from '../reusable/SectionHeader';
import ResizableBox from '../reusable/ResizableBox';

const Editor = () => {
	const { selectedView } = useContext(AppContext);

	return (
		<section
			className={`relative h-full ${
				selectedView === 'editor' ? 'only-editor w-full' : ''
			} `}
		>
			<ResizableBox direction='horizontal'>
				<>
					<SectionHeader sectionTitle='Editor' />
					<textarea className='w-full h-full px-4 pt-10 pb-2 me-20 bg-white outline-none border-none font-editor caret-primary resize-none dark:bg-darkGray500 dark:text-textGray100'></textarea>
				</>
			</ResizableBox>
		</section>
	);
};

export default Editor;
