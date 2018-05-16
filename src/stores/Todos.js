import { observable, action, computed, runInAction } from 'mobx';

import config from '../config';

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
				this.todos.push({ ...resp, ...todo})				
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
				this.todos = todos;
			})
		} catch (err) {
			console.log(err.message)
		}
	}

	@action makeCheck = async (_id) => {
		const index = this.todos.findIndex(el => el.id === _id);

		try {
			const api = await fetch(config.TODOS.withId(_id), {
				method: 'PUT',
				body: JSON.stringify({
					id: _id,
					completed: true
				}),
				headers: {
				  "Content-type": "application/json; charset=UTF-8"
				}
			});
			const resp = await api.json();

			runInAction(() => {
				this.todos[index].completed = !this.todos[index].completed;				
			});
		} catch (error) {
			console.log(error.message)
		}
	}
}


export default new Todos();