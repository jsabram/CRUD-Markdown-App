import { configureStore } from '@reduxjs/toolkit';
import RootSlice from './root-slice';

export const store = configureStore({
	reducer: RootSlice,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch