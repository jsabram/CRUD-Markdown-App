import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ChangeViewFn } from '../../@types/component-types';

const ViewDropdown = () => {
	const { areOptionsOpen, changeViewHandler } = useContext(AppContext);

	const selectViewHandler: ChangeViewFn = (value) => {
		changeViewHandler(value);
		console.log(value);
	};

	const btnClasses =
		'py-2 px-5 outline-none transition-colors duration-300 hover:text-primary focus:text-primary';

	return (
		<div
			className={`absolute -top-[85px] left-1/2 flex flex-col bg-darkGray200 rounded-md shadow-md shadow-darkGray500 text-sm text-white -translate-x-1/2 transition-transform origin-bottom duration-300 ${
				areOptionsOpen ? 'scale-1' : 'scale-0'
			} md:-top-[120px]`}
		>
			<p
				role='button'
				className='py-2 px-5 outline-none transition-colors duration-300 hover:text-primary focus:text-primary'
				onClick={() => selectViewHandler('editor')}
			>
				Editor
			</p>
			<p
				role='button'
				className='py-2 px-5 outline-none transition-colors duration-300 hover:text-primary focus:text-primary'
				onClick={() => selectViewHandler('preview')}
			>
				Preview
			</p>
			<p
				role='button'
				className={`${btnClasses} hidden md:block`}
				onClick={() => selectViewHandler('comparison')}
			>
				Comparison
			</p>
		</div>
	);
};

export default ViewDropdown;
