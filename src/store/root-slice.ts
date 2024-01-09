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
			let updatedArray = [];

			if (state.activeDocs.length === 0) {
				updatedArray = action.payload;
			} else if (
				!state.activeDocs.find(
					(doc) => (doc.id === action.payload.id)
				)
			) {
				updatedArray = state.activeDocs;
			} else {
				updatedArray = [...action.payload, ...state.activeDocs];
			}

			state.activeDocs = updatedArray;
			localStorage.setItem('activeDocs', JSON.stringify(updatedArray));
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
