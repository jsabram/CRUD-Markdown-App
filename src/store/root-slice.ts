import { createSlice } from '@reduxjs/toolkit';

interface DocumentObj {
	id: string;
	body: string;
}

interface StateObj {
	editorValue: string;
	userId: string;
	userDocs: DocumentObj[];
}

const initialState: StateObj = {
	editorValue: '',
	userId: 'string',
	userDocs: [],
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
	},
});

export const { setEditorValue, setUserData } = RootSlice.actions;
export default RootSlice.reducer;
