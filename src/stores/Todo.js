import {types} from 'mobx-state-tree';

const Todo = types.model('Todo', {
	id: types.identifier(),
	userId: types.identifier(),
	title: types.string,
	completed: types.boolean
});


export default Todo;