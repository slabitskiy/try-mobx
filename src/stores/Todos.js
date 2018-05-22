import { types, flow } from 'mobx-state-tree';
import Todo from './Todo';

import config from 'config';

const Todos = types.model('Todos', {
	todos: types.array(Todo)
}).actions(self => ({
	getTodos: flow(function* fetchTodos() {
		try {
			const api = yield fetch(config.TODOS.base);
			const todos = yield api.json();

			self.todos = todos;
		} catch (err) {
			console.log(err.message)
		}
	}),
	addTodo: flow(function* createTodo(todo){
		try {
			const api = yield fetch(config.TODOS.base, {
				method: 'POST',
				body: JSON.stringify(todo)
			});

			const resp = yield api.json();

			self.todos.push({ ...resp, ...todo});				
		} catch (error) {
			console.log(error.message)
		}
	})
}))
.create({
	todos: []
});

export default Todos;
