import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	editorValue: '',
};

const RootSlice = createSlice({
	name: 'root',
	initialState,
	reducers: {
		setEditorValue: (state, action) => {
			state.editorValue = action.payload;
		},
	},
});

export const { setEditorValue } = RootSlice.actions;
export default RootSlice.reducer;
