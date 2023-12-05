import { createSlice } from '@reduxjs/toolkit';

interface DocumentObj {
	id: string;
	createdAt: string;
	title: string;
	body: string;
}

interface StateObj {
	editorValue: string;
	userId: string;
	userDocs: DocumentObj[];
	openDoc: string;
}

const initialState: StateObj = {
	editorValue: '',
	userId: 'string',
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

export const { setEditorValue, setUserData, setOpenDoc } = RootSlice.actions;
export default RootSlice.reducer;
