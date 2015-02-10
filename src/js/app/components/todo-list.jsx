import React from 'react';
import Todo from './todo';

var TodoList = React.createClass({
    render() {
        return (
            <ul className="TodoList">
                {
                    this.props.todos.map(t =>
                        <Todo
                            key={t.id}
                            tkey={t.id}
                            content={t.content}
                            tags={t.tags}
                            onDelete={this.props.onTodoDelete}
                        />
                    )
                }
            </ul>
        );
    }
});

export default TodoList;
