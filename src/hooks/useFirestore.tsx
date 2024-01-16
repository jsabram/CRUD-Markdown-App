import { useAppSelector } from '../store/typed-hooks';
import { useDispatch } from 'react-redux';
import {
	setAppState,
	setOpenDoc,
	setUserData,
	setActiveDocs,
} from '../store/root-slice';
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
import { toast } from 'react-toastify';

export const useFirestore = () => {
	const { storedId, activeDocs } = useAppSelector((state) => ({
		storedId: state.userId,
		activeDocs: state.activeDocs,
	}));

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
		try {
			dispatch(setAppState('loading'));

			let userId = '';

			if (localStorage.getItem('userId')) {
				userId = localStorage.getItem('userId')!;
			} else {
				const { newUserId, initialDoc, initialDocStructure } = createNewUser();

				await setDoc(initialDoc, initialDocStructure);

				userId = newUserId;

				dispatch(setOpenDoc(initialDoc.id));
				dispatch(
					setActiveDocs([
						{
							id: initialDoc.id,
							title: 'welcome',
						},
					])
				);
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

			dispatch(setAppState('success'));

			dispatch(
				setUserData({
					id: storedUserId,
					docs: formattedDocuments,
				})
			);
		} catch {
			dispatch(setAppState('error'));

			toast.error(
				'The application has failed loading data from the server. Please try again later.'
			);
		}
	};

	const createDocument = async (title: string) => {
		try {
			const { userCollection } = getUserCollection(storedId);
			let newId = nanoid();

			if (userCollection !== null) {
				const docRef = await addDoc(userCollection, {
					id: newId,
					timestamp: Timestamp.now(),
					createdAt: formattedDate,
					title,
					body: '',
				});

				dispatch(setOpenDoc(docRef.id));
				dispatch(
					setActiveDocs([
						{
							id: docRef.id,
							title,
						},
						...activeDocs,
					])
				);

				getDocumentsList();
			}
		} catch {
			toast.error(
				'An error occured while creating the file. Please try again later.'
			);
		}
	};

	const updateDocBody = async (id: string, updatedContent: string) => {
		try {
			const { userCollection } = getUserCollection(storedId);

			if (userCollection !== null) {
				const docToUpdate = doc(userCollection, id);
				await updateDoc(docToUpdate, { body: updatedContent });
				getDocumentsList();

				toast.success('Document saved!');
			}
		} catch {
			toast.error(
				'An error occured while saving the file. Please try again later.'
			);
		}
	};

	const updateDocTitle = async (id: string, updatedTitle: string) => {
		try {
			const { userCollection } = getUserCollection(storedId);

			if (userCollection !== null) {
				const docToUpdate = doc(userCollection, id);

				const docSnapshot = await getDoc(docToUpdate);

				if (docSnapshot.exists()) {
					const docData = docSnapshot.data();

					if ('title' in docData) {
						const currentTitle = docData.title;

						if (currentTitle === updatedTitle) {
							return;
						}
					}
				}

				await updateDoc(docToUpdate, { title: updatedTitle });
				getDocumentsList();

				toast.success('Title changed!');
			}
		} catch {
			toast.error(
				'An error occured while changing the title. Please try again later.'
			);
		}
	};

	const deleteDocument = async (id: string) => {
		try {
			const { userCollection } = getUserCollection(storedId);

			if (userCollection !== null) {
				const docToDelete = doc(userCollection, id);

				await deleteDoc(docToDelete);

				const updatedArray = activeDocs.filter((doc) => doc.id !== id);
				const indexToDelete = activeDocs.findIndex((doc) => doc.id === id);

				dispatch(setActiveDocs(updatedArray));
				dispatch(setOpenDoc(''));


				// if (updatedArray[indexToDelete]) {
				// 	dispatch(setOpenDoc(updatedArray[indexToDelete].id));
				// } else if (updatedArray[indexToDelete - 1]) {
				// 	dispatch(setOpenDoc(updatedArray[indexToDelete - 1].id));
				// } else {
				// 	dispatch(setOpenDoc(''));
				// }

				getDocumentsList();

				toast.success('Document deleted!');
			}
		} catch {
			toast.error(
				'An error occured while deleting the file. Please try again later.'
			);
		}
	};

	return {
		getDocumentsList,
		createDocument,
		updateDocBody,
		updateDocTitle,
		deleteDocument,
	};
};
