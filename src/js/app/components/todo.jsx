import React from 'react';
import dispatcher from '../dispatcher';

var Todo = React.createClass({
    render() {
        var className = 'TodoList--item' +
            (this.props.data.done ? ' -done' : '');

        return (
            <li className={className}>
                <label className="TodoList--checkboxLabel">
                    <input
                        className="TodoList--checkbox"
                        type="checkbox"
                        checked={this.props.data.done}
                        onChange={this.onToggleDone}
                        ref="checkbox"
                    />
                </label>

            	<span className="TodoList--itemContent">
            		{this.props.data.content}
            	</span>

            	<div className="TodoList--tagContainer">
            		{
            			/*(this.props.data.tags || []).map(t =>
            				<span key={t} className="TodoList--tag">{t}</span>
            			)*/
            		}
            	</div>

            	<button className="TodoList--delete" onClick={this.onDelete}>
            		x
            	</button>
            </li>
        );
    },

    onToggleDone() {
        dispatcher.dispatch('setTodoState', {
            state: this.refs.checkbox.getDOMNode().checked,
            id: this.props.data.id
        });
    },

    onDelete() {
        dispatcher.dispatch('deleteTodo', this.props.data.id);
    }
});

export default Todo;
