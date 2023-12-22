import { createSlice } from '@reduxjs/toolkit';
import { StateObj } from '../@types/component-types';

const initialState: StateObj = {
	editorValue: '',
	savedValue: '',
	userId: '',
	userDocs: [],
	openDoc: '',
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
	},
});

export const {
	setEditorValue,
	setSavedValue,
	setUserData,
	setOpenDoc,
} = RootSlice.actions;
export default RootSlice.reducer;
