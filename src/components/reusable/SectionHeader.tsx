import { SectionHeaderProps } from '../../@types/component-types';

const SectionHeader: React.FC<SectionHeaderProps> = ({ sectionTitle }) => {
	return (
		<h4 className='py-1 px-4 bg-lightGray text-textGray200 tracking-wide dark:bg-darkGray300'>
			{sectionTitle}
		</h4>
	);
};

export default SectionHeader;
