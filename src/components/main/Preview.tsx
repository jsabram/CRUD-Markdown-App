import { useEffect, useContext } from 'react';
import { useAppSelector } from '../../store/typed-hooks';
import { AppContext } from '../../context/AppContext';
import { unified } from 'unified';
import {
	remarkDefinitionList,
	defListHastHandlers,
} from 'remark-definition-list';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import SectionHeader from '../reusable/SectionHeader';

const Preview = () => {
	const { selectedView } = useContext(AppContext);

	const markdown = useAppSelector((state) => state.editorValue);

	const compileHandler = async (md: any) => {
		const html = await unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkDefinitionList)
			.use(remarkRehype, {
				handlers: {
					...defListHastHandlers,
				},
			})
			.use(rehypeStringify)
			.process(md);

		document.querySelector('#preview')!.innerHTML = html.value.toString();
	};

	useEffect(() => {
		compileHandler(markdown);
	}, [markdown]);

	return (
		<section
			className={`relative h-full bg-white dark:bg-darkGray500 ${
				selectedView === 'preview' ? 'w-[100vw]' : 'w-full'
			}`}
		>
			<SectionHeader sectionTitle='Preview' />
			<div
				id='preview'
				className='preview h-full px-8 pt-10 pb-2 text-darkGray200 font-preview overflow-y-scroll dark:text-textGray100'
			></div>
		</section>
	);
};

export default Preview;
