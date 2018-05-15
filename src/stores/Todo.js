import { observable, action, computed } from 'mobx';

export default class Tods {
	@observable todo = {};

	@computed get getTodos() {
		return this.todos;
	}
}