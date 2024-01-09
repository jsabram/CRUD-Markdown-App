import { useAppSelector } from '../store/typed-hooks';
import { useDispatch } from 'react-redux';
import { setOpenDoc, setUserData, setActiveDocs } from '../store/root-slice';
import { nanoid } from 'nanoid';
import { db } from '../config/firebase';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	query,
	orderBy,
	Timestamp,
} from 'firebase/firestore';
import { formattedDate } from '../utils/date';

export const useFirestore = () => {
	const storedId = useAppSelector((state) => state.userId);

	const dispatch = useDispatch();

	const createNewUser = () => {
		const newUserId = nanoid();
		localStorage.setItem('userId', newUserId);

		const userRef = doc(db, 'markdown', newUserId);
		setDoc(userRef, {});

		const initialDoc = doc(
			collection(userRef, 'userDocuments'),
			'initialDocument'
		);

		const initialDocStructure = {
			id: nanoid(),
			timestamp: Timestamp.now(),
			createdAt: formattedDate,
			title: 'welcome',
			body:
				"# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
		};

		return { newUserId, initialDoc, initialDocStructure };
	};

	const getUserCollection = (id: string) => {
		const userRef = doc(db, 'markdown', id);
		const userCollection = collection(userRef, 'userDocuments');

		return { userRef, userCollection };
	};

	const getDocumentsList = async () => {
		let userId = '';

		if (localStorage.getItem('userId')) {
			userId = localStorage.getItem('userId')!;
		} else {
			const { newUserId, initialDoc, initialDocStructure } = createNewUser();

			await setDoc(initialDoc, initialDocStructure);
			userId = newUserId;
		}

		const { userRef, userCollection } = getUserCollection(userId);

		const userDocuments = await getDocs(
			query(userCollection, orderBy('timestamp', 'desc'))
		);
		const formattedDocuments = userDocuments.docs.map((doc) => {
			const { timestamp, ...rest } = doc.data();
			return {
				...rest,
				id: doc.id,
			};
		});

		const user = await getDoc(userRef);
		const storedUserId = user.id;

		if (localStorage.getItem('openDoc')) {
			dispatch(setOpenDoc(localStorage.getItem('openDoc')));
		} else {
			dispatch(setOpenDoc(formattedDocuments[0].id));
		}

		if (localStorage.getItem('activeDocs')) {
			dispatch(
				setActiveDocs(JSON.parse(localStorage.getItem('activeDocs')!))
			);
		} else {
			if ('title' in formattedDocuments[0]) {
				dispatch(
					setActiveDocs([
						{
							id: formattedDocuments[0].id,
							title: formattedDocuments[0].title,
						},
					])
				);
			}
		}

		dispatch(
			setUserData({
				id: storedUserId,
				docs: formattedDocuments,
			})
		);
	};

	const createDocument = async (title: string) => {
		const { userCollection } = getUserCollection(storedId);

		if (userCollection !== null) {
			await addDoc(userCollection, {
				id: nanoid(),
				timestamp: Timestamp.now(),
				createdAt: formattedDate,
				title,
				body: '',
			});
			getDocumentsList();
		}
	};

	const saveDocument = async (id: string, updatedContent: string) => {
		const { userCollection } = getUserCollection(storedId);

		if (userCollection !== null) {
			const docToUpdate = doc(userCollection, id);
			await updateDoc(docToUpdate, { body: updatedContent });
			getDocumentsList();
		}
	};

	const deleteDocument = async (id: string) => {
		const { userCollection } = getUserCollection(storedId);

		if (userCollection !== null) {
			const docToDelete = doc(userCollection, id);
			await deleteDoc(docToDelete);
			getDocumentsList();
		}
	};

	return {
		getDocumentsList,
		createDocument,
		saveDocument,
		deleteDocument,
	};
};
