import React from 'react';
import TodoItem from './todo-item';

var TodoList = React.createClass({
    render() {
        return (
            <ul>
                <TodoItem title="xyz" />
            </ul>
        );
    }
});

export default TodoList;
