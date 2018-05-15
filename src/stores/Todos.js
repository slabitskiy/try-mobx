import { observable, action, computed, runInAction } from 'mobx';

import config from '../config';

class Todos {
	@observable todos = [];

	@action addTodo = (todo) => {
		this.todos.push(todo)
	}

	@computed get getTodos() {
		return this.todos;
	}

	@action getTodos = async () => {
		try {
			const api = await fetch(config.BASE);
			const todos = await api.json();

			runInAction(() => {
				this.todos = todos;
			})
		} catch (err) {
			console.log(err.message)
		}
	}
}


export default new Todos();