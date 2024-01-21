import { useState, useEffect, useContext  } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { setEditorValue, setSavedValue } from '../../store/root-slice';
import { AppContext } from '../../context/AppContext';
import SectionHeader from '../reusable/SectionHeader';
import ResizableBox from '../reusable/ResizableBox';

const Editor = () => {
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
		const content = userDocs.find((doc) => doc.id === openDoc);
		const textarea = document.querySelector('#editor') as HTMLTextAreaElement;

		if (content) {
			textarea!.value = content!.body;

			dispatch(setEditorValue(content!.body));
			dispatch(setSavedValue(content!.body));
		} else {
			return;
		}
		
	}, [userDocs, openDoc, dispatch]);

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
						id='editor'
						className='w-full h-full px-8 pt-10 pb-2 me-20 bg-white outline-none border-none font-editor caret-primary resize-none dark:bg-darkGray500 dark:text-textGray100'
						onChange={editorValueHandler}
						onKeyDown={deleteAllHandler}
						onInput={deleteOnMobileHandler}
					></textarea>
				</>
			</ResizableBox>
		</section>
	);
};

export default Editor;
