import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Home extends React.Component {
	state = {}

	componentWillMount() {
		this.props.store.Todos.getTodos();
	}

	inputChangeHandl = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		});
	}
	createTodo = (e) => {
		e.preventDefault();

		this.props.store.Todos.addTodo(this.state);

		this.setState({
			'title': '',
			'text': ''
		});
	}

	render() {
		const { store: { Todos: todos }} = this.props;

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
					<div className="form-group">
						<input name="text"
							value={this.state.text || ''}
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
					todos.todos.map(el => (
						<li className="list-group-item" key={el.id}>
							{el.title}
							<div className="float-right">
								<input type="checkbox" class="form-check-input" />
							</div>
						</li>
					))
				}
				</ul>
		   </div>
	   )
	}	
}

export default Home;
// export default inject('store')(observer(Home)) ;