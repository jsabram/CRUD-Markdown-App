import { ModalMessageProps } from '../../@types/component-types';

const ModalMessage: React.FC<ModalMessageProps> = ({
	title,
	message,
	children,
}) => {
	return (
		<div className='w-72 py-6 px-5 bg-white rounded-lg z-50 dark:bg-darkGray300 md:w-96'>
			<h5 className='text-lg text-darkGray100 font-bold dark:text-white md:text-2xl'>
				{title}
			</h5>
			<p className='mt-2 mb-8 text-textGray200 leading-6 dark:text-textGray100'>
				{message}
			</p>
			{children}
		</div>
	);
};

export default ModalMessage;
