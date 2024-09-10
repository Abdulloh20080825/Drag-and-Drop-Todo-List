import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeTask,
	completeTask,
	toggleEditTask,
	updateTaskText,
	moveTaskToActive,
} from '../store/slice/todo';

const TodoList = () => {
	const dispatch = useDispatch();
	const { activeTasks, completedTasks } = useSelector((state) => state.tasks);
	const [editedText, setEditedText] = useState('');
	const [draggedTask, setDraggedTask] = useState(null);

	const handleSaveEdit = (id) => {
		dispatch(updateTaskText({ id, newText: editedText }));
	};

	const dragStart = (e, task, listType) => {
		setDraggedTask({ ...task, listType });
	};

	const dropOnCompleted = (e) => {
		e.preventDefault();
		if (draggedTask && draggedTask.listType === 'active') {
			dispatch(completeTask(draggedTask.id));
		}
		setDraggedTask(null);
	};

	const dropOnActive = (e) => {
		e.preventDefault();
		if (draggedTask && draggedTask.listType === 'completed') {
			dispatch(moveTaskToActive(draggedTask.id));
		}
		setDraggedTask(null);
	};

	const dragOver = (e) => {
		e.preventDefault();
	};

	return (
		<div className='flex space-x-10 w-full max-w-6xl'>
			<div
				onDragOver={dragOver}
				onDrop={dropOnActive}
				className='w-full max-w-lg bg-cyan-400 p-6 rounded-lg mt-6 shadow-xl'
			>
				<h2 className='text-2xl font-semibold mb-4 text-white'>Active Tasks</h2>
				{activeTasks.map((task) => (
					<div
						onDragStart={(e) => dragStart(e, task, 'active')}
						draggable={true}
						key={task.id}
						className='bg-yellow-300 flex justify-between items-center p-4 rounded-lg mb-4 shadow-lg transition-transform transform hover:scale-105'
					>
						{task.isEditing ? (
							<input
								type='text'
								className='w-full text-lg p-2 rounded-lg text-black'
								value={editedText}
								onChange={(e) => setEditedText(e.target.value)}
								placeholder={task.text}
							/>
						) : (
							<span className='text-black text-lg'>{task.text}</span>
						)}

						<div className='flex space-x-3'>
							{task.isEditing ? (
								<>
									<button
										className='bg-green-600 text-white p-2 rounded-full hover:bg-green-400 transition'
										onClick={() => handleSaveEdit(task.id)}
									>
										✔️
									</button>
									<button
										className='bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 transition'
										onClick={() => dispatch(toggleEditTask(task.id))}
									>
										❌
									</button>
								</>
							) : (
								<>
									<button
										className='bg-blue-600 text-white p-2 rounded-full hover:bg-blue-400 transition'
										onClick={() => {
											dispatch(toggleEditTask(task.id));
											setEditedText(task.text);
										}}
									>
										✏️
									</button>
									<button
										className='bg-red-600 text-white p-2 rounded-full hover:bg-red-400 transition'
										onClick={() => dispatch(removeTask(task.id))}
									>
										🗑️
									</button>
									<button
										className='bg-green-600 text-white p-2 rounded-full hover:bg-green-400 transition'
										onClick={() => dispatch(completeTask(task.id))}
									>
										✔️
									</button>
								</>
							)}
						</div>
					</div>
				))}
			</div>
			<div
				onDragOver={dragOver}
				onDrop={dropOnCompleted}
				className='w-full max-w-lg bg-red-500 p-6 rounded-lg mt-6 shadow-xl space-y-5'
			>
				<h2 className='text-2xl font-semibold mb-4 text-white'>
					Completed Tasks
				</h2>
				{completedTasks.map((task) => (
					<div
						onDragStart={(e) => dragStart(e, task, 'completed')}
						draggable={true}
						key={task.id}
						className='bg-yellow-300 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105'
					>
						<span className='text-black text-lg'>{task.text}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default TodoList;
