import React from 'react';
import Todo from './todo';

var data = ['abc', 'def', 'ghi'];

var Todos = React.createClass({
    render() {
        return (
            <ul>
                {
                    data.map(todo => <Todo title={todo} />)
                }
            </ul>
        );
    }
});

export default Todos;
