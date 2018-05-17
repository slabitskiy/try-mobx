import React from 'react';
import { inject, observer } from 'mobx-react';
import './style.css'
@observer
class TodoView extends React.Component {
	render() {
		const { todo: { todo, isLoading } } = this.props; 
		return (
			<li className={
				`list-group-item ${todo.completed ? 'active' : '' } ${isLoading ? '-loading' : ''}` 
				}
				onClick={this.props.onComplete}
			>
				{todo.title}
				<div className="float-right">
					<input type="checkbox" className="form-check-input" checked={todo.completed} />
				</div>
			</li>
		)
	}
}

export default TodoView;