import { useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { setEditorValue } from '../../store/root-slice';
import { AppContext } from '../../context/AppContext';
import SectionHeader from '../reusable/SectionHeader';
import ResizableBox from '../reusable/ResizableBox';

const Editor = () => {
	const [defaultValue, setDefaultValue] = useState('');
	const { userDocs, openDoc } = useAppSelector((state) => ({
		userDocs: state.userDocs,
		openDoc: state.openDoc,
	}));

	const { selectedView } = useContext(AppContext);

	const dispatch = useDispatch();

	const editorValueHandler = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		dispatch(setEditorValue(event.target.value));
	};

	useEffect(() => {
		const defaultDoc = userDocs.find((userDoc) => userDoc.id === openDoc);
		if (defaultDoc) {
			setDefaultValue(defaultDoc.body);
			dispatch(setEditorValue(defaultDoc.body));
		}
	}, [userDocs, openDoc]);

	return (
		<section
			className={`relative h-full ${
				selectedView === 'editor' ? 'only-editor' : ''
			} `}
		>
			<ResizableBox direction='horizontal'>
				<>
					<SectionHeader sectionTitle='Editor' />
					<textarea
						className='w-full h-full px-8 pt-10 pb-2 me-20 bg-white outline-none border-none font-editor caret-primary resize-none dark:bg-darkGray500 dark:text-textGray100'
						onChange={editorValueHandler}
						defaultValue={defaultValue}
					></textarea>
				</>
			</ResizableBox>
		</section>
	);
};

export default Editor;
