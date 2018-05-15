import React from 'react';
import { inject, observer } from 'mobx-react';
// eslint-disable-next-line
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
			<React.Fragment>
				<form onSubmit={this.createTodo}>
					<input name="title" value={this.state.title || ''} onChange={this.inputChangeHandl} required/>
					<br />
					<br />
					<input name="text" value={this.state.text || ''} onChange={this.inputChangeHandl} required/>
					<br />
					<br />					
					<button>
						Create todo
					</button>
				</form>
				{
					todos.todos.map(el => (
						<div key={el.title}>
							<p>{el.title}</p>
							<p>{el.text}</p>
						</div>
					))
				}
		   </React.Fragment>
	   )
	}	
}

export default Home;
// export default inject('store')(observer(Home)) ;