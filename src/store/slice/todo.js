import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	activeTasks: [],
	completedTasks: [],
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.activeTasks.push({
				id: Date.now(),
				text: action.payload,
				isEditing: false,
			});
		},
		removeTask: (state, action) => {
			state.activeTasks = state.activeTasks.filter(
				(task) => task.id !== action.payload
			);
		},
		completeTask: (state, action) => {
			const completedTask = state.activeTasks.find(
				(task) => task.id === action.payload
			);
			if (completedTask) {
				state.activeTasks = state.activeTasks.filter(
					(task) => task.id !== action.payload
				);
				state.completedTasks.push(completedTask);
			}
		},
		toggleEditTask: (state, action) => {
			const taskToEdit = state.activeTasks.find(
				(task) => task.id === action.payload
			);
			if (taskToEdit) {
				taskToEdit.isEditing = !taskToEdit.isEditing;
			}
		},
		updateTaskText: (state, action) => {
			const { id, newText } = action.payload;
			const taskToUpdate = state.activeTasks.find((task) => task.id === id);
			if (taskToUpdate) {
				taskToUpdate.text = newText;
				taskToUpdate.isEditing = false;
			}
		},
		moveTaskToActive: (state, action) => {
			const taskId = action.payload;
			const task = state.completedTasks.find((t) => t.id === taskId);
			if (task) {
				state.completedTasks = state.completedTasks.filter(
					(t) => t.id !== taskId
				);
				state.activeTasks.push(task);
			}
		},
		moveTaskToCompleted: (state, action) => {
			const taskId = action.payload;
			const task = state.activeTasks.find((t) => t.id === taskId);
			if (task) {
				state.activeTasks = state.activeTasks.filter((t) => t.id !== taskId);
				state.completedTasks.push(task);
			}
		},
	},
});

export const {
	addTask,
	removeTask,
	completeTask,
	toggleEditTask,
	updateTaskText,
	moveTaskToActive,
	moveTaskToCompleted,
} = tasksSlice.actions;

export default tasksSlice.reducer;
