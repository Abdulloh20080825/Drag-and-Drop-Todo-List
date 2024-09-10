import Add from './components/add';
import TodoList from './components/TodoList';

const App = () => {
	return (
		<div className='h-screen flex items-center flex-col bg-sky-700 text-white'>
			<Add />
			<TodoList />
		</div>
	);
};

export default App;
