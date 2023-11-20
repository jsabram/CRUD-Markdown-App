import { ResizableBox as ResizableContainer } from 'react-resizable';
import { ResizableBoxProps } from '../../@types/component-types';

const ResizableBox: React.FC<ResizableBoxProps> = ({ direction, children }) => {
	return (
		<ResizableContainer
			className='h-full'
			height={Infinity}
			width={window.innerWidth / 2}
			minConstraints={[window.innerWidth * 0.2, Infinity]}
			maxConstraints={[window.innerWidth * 0.8, Infinity]}
			resizeHandles={['e']}
		>
			{children}
		</ResizableContainer>
	);
};

export default ResizableBox;
