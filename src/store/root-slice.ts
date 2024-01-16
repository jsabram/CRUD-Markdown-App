import { createSlice } from '@reduxjs/toolkit';
import { StateObj } from '../@types/component-types';

const initialState: StateObj = {
	appState: 'loading',
	editorValue: '',
	savedValue: '',
	userId: '',
	userDocs: [],
	openDoc: '',
	activeDocs: [],
};

const RootSlice = createSlice({
	name: 'root',
	initialState,
	reducers: {
		setAppState: (state, action) => {
			state.appState = action.payload;
		},
		setEditorValue: (state, action) => {
			state.editorValue = action.payload;
		},
		setSavedValue: (state, action) => {
			state.savedValue = action.payload;
		},
		setUserData: (state, action) => {
			state.userId = action.payload.id;
			state.userDocs = action.payload.docs;
		},
		setOpenDoc: (state, action) => {
			state.openDoc = action.payload;
			localStorage.setItem('openDoc', action.payload);
		},
		setActiveDocs: (state, action) => {
			state.activeDocs = action.payload;

			localStorage.setItem('activeDocs', JSON.stringify(action.payload));
		},
		updateActiveDocs: (state, action) => {
			if (state.activeDocs.find((doc) => doc.id === action.payload.id)) {
				return;
			} else {
				const updatedArray = [action.payload, ...state.activeDocs];

				state.activeDocs = updatedArray;

				localStorage.setItem('activeDocs', JSON.stringify(updatedArray));
			}
		},
	},
});

export const {
	setAppState,
	setEditorValue,
	setSavedValue,
	setUserData,
	setOpenDoc,
	setActiveDocs,
	updateActiveDocs,
} = RootSlice.actions;
export default RootSlice.reducer;
