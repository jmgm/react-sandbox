import React from 'react';
import TodoForm from './todo-form';
import TodoList from './todo-list';

var Todos = React.createClass({
    render() {
        return (
            <div>
                <TodoForm />
                <TodoList />
            </div>
        );
    }
});

export default Todos;
