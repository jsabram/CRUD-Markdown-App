import ReactDOM from 'react-dom';
import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData, setOpenDoc } from './store/root-slice';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useSwipeable } from 'react-swipeable';
import { useTheme } from './hooks/useTheme';
import { AppContext } from './context/AppContext';
import Header from './components/header/Header';
import Main from './components/main/Main';
import AsideMenu from './components/aside/AsideMenu';
import DeleteDocModal from './components/modal/DeleteDocModal';
import CreateDocModal from './components/modal/CreateDocModal';
import { db } from './config/firebase';
import { getDocs, collection, doc, setDoc, getDoc } from 'firebase/firestore';

import { createNewUserHandler } from './utils/firebase-utils';

const App = () => {
	const {
		toggleThemeHandler,
		openMenuHandler,
		closeMenuHandler,
		changeViewHandler,
		isDeleteModalOpen,
		isCreateModalOpen,
	} = useContext(AppContext);

	const dispatch = useDispatch();

	const isTablet = useMediaQuery('(min-width: 768px)');

	const swipeHandlers = useSwipeable({
		onSwipedRight: () => openMenuHandler(),
		onSwipedLeft: () => closeMenuHandler(),
	});

	const checkThemeHandler = useTheme();

	useEffect(() => {
		const theme = checkThemeHandler();
		if (theme === 'dark') {
			toggleThemeHandler();
		}
		isTablet && changeViewHandler('comparison');

		const getDocumentsList = async () => {
			let userId;

			if (localStorage.getItem('userId')) {
				userId = localStorage.getItem('userId');
			} else {
				const {
					newUserId,
					userInitialDoc,
					initialDocument,
				} = createNewUserHandler();

				userId = newUserId;
				await setDoc(userInitialDoc, initialDocument);
			}

			const userRef = doc(db, 'markdown', userId!);
			const user = await getDoc(userRef);
			const storedUserId = user.id; // current user ID

			const userDocs = await getDocs(collection(userRef, 'userDocuments'));
			const storedDocs = userDocs.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			if (localStorage.getItem('openDoc')) {
				dispatch(setOpenDoc(localStorage.getItem('openDoc')));
			} else {
				dispatch(setOpenDoc(storedDocs[0].id));
			}

			dispatch(
				setUserData({
					id: storedUserId,
					docs: storedDocs,
				})
			);
		};

		getDocumentsList();
	}, []);

	return (
		<>
			<div
				className='relative overflow-hidden xxl:max-w-[2220px] xxl:mx-auto'
				{...swipeHandlers}
			>
				<Header />
				<Main />
				<AsideMenu />
				{isDeleteModalOpen &&
					ReactDOM.createPortal(
						<DeleteDocModal />,
						document.getElementById('modal')!
					)}
				{isCreateModalOpen &&
					ReactDOM.createPortal(
						<CreateDocModal />,
						document.getElementById('modal')!
					)}
			</div>
		</>
	);
};

export default App;
