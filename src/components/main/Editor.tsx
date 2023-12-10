import { useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { setEditorValue } from '../../store/root-slice';
import { AppContext } from '../../context/AppContext';
import SectionHeader from '../reusable/SectionHeader';
import ResizableBox from '../reusable/ResizableBox';

const Editor = () => {
	const [defaultValue, setDefaultValue] = useState('');
	const [pressedKeys, setPressedKeys] = useState<string[]>([]);

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

	const deleteAllHandler = (
		event: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		if (pressedKeys.length < 3) {
			setPressedKeys([...pressedKeys, event.key]);
		} else {
			const removedIndex = pressedKeys.shift() as string;
			setPressedKeys([removedIndex, event.key]);
		}

		if (
			(pressedKeys[0] === 'Control' && pressedKeys[1] === 'a') ||
			(pressedKeys[0] === 'Control' && pressedKeys[1] === 'A')
		) {
			dispatch(setEditorValue(''));
		}
	};

	const deleteOnMobileHandler = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const inputValue = event.target.value;

		inputValue.length === 0 && dispatch(setEditorValue(''));
	};

	useEffect(() => {
		const defaultDoc = userDocs.find((userDoc) => userDoc.id === openDoc);
		if (defaultDoc) {
			setDefaultValue(defaultDoc.body);
			dispatch(setEditorValue(defaultDoc.body));
		} else {
			setDefaultValue('');
			dispatch(setEditorValue(''));
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
						onKeyDown={deleteAllHandler}
						onInput={deleteOnMobileHandler}
						defaultValue={defaultValue}
					></textarea>
				</>
			</ResizableBox>
		</section>
	);
};

export default Editor;
