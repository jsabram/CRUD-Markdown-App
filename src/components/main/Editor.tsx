import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SectionHeader from '../reusable/SectionHeader';

const Editor = () => {
	const { selectedView } = useContext(AppContext);

	return (
		<section
			className={`h-full ${
				selectedView === 'editor' ? 'basis-full' : 'basis-1/2'
			} bg-lime-200`}
		>
			<SectionHeader sectionTitle='Editor' />
		</section>
	);
};

export default Editor;
