import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAV5ykMvWcMofFFqUt2fuugHYrNXCDqbBw',
	authDomain: 'crud-markdown.firebaseapp.com',
	projectId: 'crud-markdown',
	storageBucket: 'crud-markdown.appspot.com',
	messagingSenderId: '784177806055',
	appId: '1:784177806055:web:2787f8335159100d58c042',
	measurementId: 'G-P2F3XH2CEK',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
