import ReactDOM from 'react-dom';
import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useSwipeable } from 'react-swipeable';
import { Slide, ToastContainer } from 'react-toastify';
import { useTheme } from './hooks/useTheme';
import { useFirestore } from './hooks/useFirestore';
import { setOpenDoc, setActiveDocs } from './store/root-slice';
import { AppContext } from './context/AppContext';
import Header from './components/header/Header';
import Main from './components/main/Main';
import AsideMenu from './components/aside/AsideMenu';
import DeleteDocModal from './components/modal/DeleteDocModal';
import CreateDocModal from './components/modal/CreateDocModal';

import 'react-toastify/dist/ReactToastify.css';

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

	const { getDocumentsList } = useFirestore();

	useEffect(() => {
		const theme = checkThemeHandler();
		if (theme === 'dark') {
			toggleThemeHandler();
		}

		isTablet && changeViewHandler('comparison');
		getDocumentsList();

		if (localStorage.getItem('openDoc')) {
			dispatch(setOpenDoc(localStorage.getItem('openDoc')));
		}

		if (localStorage.getItem('activeDocs')) {
			const formattedArray = JSON.parse(localStorage.getItem('activeDocs')!);

			dispatch(setActiveDocs(formattedArray));
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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
			<ToastContainer
				role='alert'
				transition={Slide}
				autoClose={2500}
				limit={1}
				className='toast'
				toastClassName='bg-lightGray font-regular text-textGray200 dark:bg-darkGray200'
			/>
		</>
	);
};

export default App;
