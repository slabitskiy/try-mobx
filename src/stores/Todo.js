import { observable, action, runInAction } from 'mobx';
import config from '../config';

export default class Todo {
	@observable todo = {};
	@observable isLoading = false;
	constructor(todo){
		this.todo = todo;
	}

	@action makeCompleted = async () => {
		const id = this.todo.id;
		const completed = !this.todo.completed;
		this.isLoading = true;
		try {
			const api = await fetch(config.TODOS.withId(id), {
				method: 'PUT',
				body: JSON.stringify({
					id,
					completed
				}),
				headers: {
				  "Content-type": "application/json; charset=UTF-8"
				}
			});
			const resp = await api.json();

			runInAction(() => {
				this.isLoading = false;
				this.todo.completed = completed;			
			});
		} catch (error) {
			console.log(error.message)
		}
	}
}