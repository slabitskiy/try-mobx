import React from 'react';
import { observer } from 'mobx-react';
import TodoView from './components/TodoView';

@observer(['Todos'])
class Home extends React.Component {
	state = {}

	componentWillMount() {
		this.props.Todos.getTodos();
	}

	inputChangeHandl = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		});
	}
	createTodo = (e) => {
		e.preventDefault();

		this.props.Todos.addTodo(this.state);

		this.setState({
			'title': '',
			'text': ''
		});
	}

	onCompleteHandl = (todo) => () => {
		todo.makeCompleted();
	}

	render() {
		const {  Todos: todos } = this.props;

		return (
			<div className="container">
				<form onSubmit={this.createTodo}>
					<div className="form-group">
						<label for="exampleInputEmail1">Email address</label>
						<input name="title"
							id="exampleInputEmail1"
							class="form-control" 
							value={this.state.title || ''}
							onChange={this.inputChangeHandl}
							required
						/>
					</div>
					<button className="btn btn-primary">
						Create todo
					</button>
				</form>
				<ul className="list-group" style={{ marginTop: 20 }}>
				{
					todos.todos.map(todo => 
						<TodoView todo={todo} key={todo.todo.id} onComplete={this.onCompleteHandl(todo)} />
					)
				}
				</ul>
		   </div>
	   )
	}	
}

export default Home;
// export default inject('store')(observer(Home)) ;