import SectionHeader from '../reusable/SectionHeader';

const Preview = () => {
	return (
		<section
			className={`relative h-full w-full bg-white dark:bg-darkGray500 `}
		>
			<SectionHeader sectionTitle='Preview' />
			<div className='h-full px-4 pt-10 pb-2 font-preview overflow-y-scroll'></div>
		</section>
	);
};

export default Preview;

