import { SectionHeaderProps } from '../../@types/component-types';

const SectionHeader: React.FC<SectionHeaderProps> = ({ sectionTitle }) => {
	return (
		<h4 className='absolute top-0 right-0 left-0 py-1 px-4 bg-lightGray font-[400] text-textGray200 tracking-wide z-[5] dark:bg-darkGray300'>
			{sectionTitle}
		</h4>
	);
};

export default SectionHeader;
