import { ResizableBox as ResizableContainer } from 'react-resizable';

interface ResizableBoxProps {
	direction: 'horizontal';
	children: React.ReactNode;
}

const ResizableBox: React.FC<ResizableBoxProps> = ({ direction, children }) => {
	return (
		<ResizableContainer
			className='w-full h-full bg-red-400'
			height={Infinity}
			width={Infinity}
			resizeHandles={['e']}
		>
			{children}
		</ResizableContainer>
	);
};

export default ResizableBox;
