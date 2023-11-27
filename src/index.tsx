import ReactDOM from 'react-dom/client';
import App from './App';
import AppContextProvider from './context/AppContextProvider';
import { store } from './store/root-store';
import { Provider } from 'react-redux';

import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</Provider>
);
