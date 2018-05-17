import { observable, action, computed, runInAction } from 'mobx';

import config from '../config';
import Todo from './Todo';

class Todos {
	@observable todos = [];

	@action addTodo = async (todo) => {
		try {
			const api = await fetch(config.TODOS.base, {
				method: 'POST',
				body: JSON.stringify(todo)
			});

			const resp = await api.json();

			runInAction(() => {
				this.todos.push(new Todo({ ...resp, ...todo}))				
			});
		} catch (error) {
			console.log(error.message)
		}
	}

	@computed get getTodos() {
		return this.todos;
	}

	@action getTodos = async () => {
		try {
			const api = await fetch(config.TODOS.base);
			const todos = await api.json();

			runInAction(() => {
				this.todos = todos.map(todo => new Todo(todo));
			});
		} catch (err) {
			console.log(err.message)
		}
	}
}


export default new Todos();