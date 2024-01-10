import { createSlice } from '@reduxjs/toolkit';
import { StateObj } from '../@types/component-types';

const initialState: StateObj = {
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
	},
});

export const {
	setEditorValue,
	setSavedValue,
	setUserData,
	setOpenDoc,
	setActiveDocs,
} = RootSlice.actions;
export default RootSlice.reducer;
