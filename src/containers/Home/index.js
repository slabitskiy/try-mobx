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

	onCompleteHandl = (id) => () => {
		this.props.Todos.makeCheck(id);
	}

	render() {
		const {  Todos: todos } = this.props;

		return (
			<div className="container">
				<form onSubmit={this.createTodo}>
					<div className="form-group">
						<input name="title"
							value={this.state.title || ''}
							onChange={this.inputChangeHandl}
							required
						/>
					</div>
					{/* <div className="form-group">
						<input name="text"
							value={this.state.text || ''}
							onChange={this.inputChangeHandl}
							required
						/>
					</div> */}
					<button className="btn btn-primary">
						Create todo
					</button>
				</form>
				<ul className="list-group" style={{ marginTop: 20 }}>
				{
					todos.todos.map(todo => 
						<TodoView todo={todo} key={todo.id} onComplete={this.onCompleteHandl(todo.id)} />
					)
				}
				</ul>
		   </div>
	   )
	}	
}

export default Home;
// export default inject('store')(observer(Home)) ;