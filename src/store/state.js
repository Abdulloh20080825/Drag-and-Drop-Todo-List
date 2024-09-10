import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slice/todo';

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
	},
});
