import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const ViewDropdown = () => {
	const { areOptionsOpen } = useContext(AppContext);

	const options = ['Editor', 'Preview', 'Comparison'];

	const selectViewHandler = (view: string) => {
		console.log(`Selected view: ${view}`);
	};

	return (
		<div
			className={`absolute -top-[120px] left-1/2 flex flex-col bg-darkGray200 rounded-md shadow-md shadow-darkGray500 text-sm text-white -translate-x-1/2 transition-transform origin-bottom duration-300 ${
				areOptionsOpen ? 'scale-1' : 'scale-0'
			}`}
		>
			{options.map((option, idx) => (
				<button
					key={idx}
					className='py-2 px-5 outline-none transition-colors duration-300 hover:text-primary focus:text-primary'
					onClick={() => selectViewHandler(option)}
				>
					{option}
				</button>
			))}
		</div>
	);
};

export default ViewDropdown;
