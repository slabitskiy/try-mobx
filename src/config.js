
const url = 'https://jsonplaceholder.typicode.com/';

export default {
	TODOS: {
		base: `${url}todos`,
		withId: id => `${url}todos/${id}`
	}
};