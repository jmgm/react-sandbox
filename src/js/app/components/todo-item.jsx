import React from 'react';

var TodoItem = React.createClass({
    render() {
        return (
            <li>{this.props.title}</li>
        );
    }
});

export default TodoItem;
