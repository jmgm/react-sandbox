import React from 'react';
import dispatcher from '../dispatcher';

var Todo = React.createClass({
    render() {
        return (
            <li className="TodoList--item">
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

    onDelete() {
    	dispatcher.dispatch('deleteTodo', this.props.data.id);
    }
});

export default Todo;
