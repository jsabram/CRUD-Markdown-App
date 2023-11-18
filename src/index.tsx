import ReactDOM from 'react-dom/client';
import App from './App';
import AppContextProvider from './context/AppContextProvider';

import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<AppContextProvider>
		<App />
	</AppContextProvider>
);
