import React from 'react';

var Todo = React.createClass({
    render() {
        return (
            <li className="TodoList--item">
            	<span className="TodoList--itemContent">
            		{this.props.content}
            	</span>

            	<div className="TodoList--tagContainer">
            		{
            			/*(this.props.tags || []).map(t =>
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
    	console.log(this.props.tkey);
    	this.props.onDelete(this.props.tkey);
    }
});

export default Todo;
