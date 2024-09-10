import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slice/todo';

const Add = () => {
	const [task, setTask] = useState('');
	const dispatch = useDispatch();

	const handleAddTask = (e) => {
		e.preventDefault();
		if (task.trim()) {
			dispatch(addTask(task));
			setTask('');
		}
	};

	return (
		<div className='h-1/3 py-5 text-center flex flex-col space-y-6'>
			<h1 className='text-5xl font-bold text-white mb-4 tracking-wider'>
				TASKIFY
			</h1>
			<form
				className='w-full max-w-md bg-white py-4 px-6 rounded-full shadow-lg flex items-center space-x-4 text-black'
				onSubmit={handleAddTask}
			>
				<input
					type='text'
					placeholder='Enter a task'
					className='w-full py-2 px-4 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
					value={task}
					onChange={(e) => setTask(e.target.value)}
				/>
				<button
					type='submit'
					className='bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 shadow-md hover:scale-105 transition-transform'
				>
					Go
				</button>
			</form>
		</div>
	);
};

export default Add;
