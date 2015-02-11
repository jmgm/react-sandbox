import React from 'react';
import Todo from './todo';

var TodoList = React.createClass({
    render() {
        return (
            <ul className="TodoList">
                {
                    this.props.data.map(t =>
                        <Todo key={t.id} data={t} />
                    )
                }
            </ul>
        );
    }
});

export default TodoList;
