import React from 'react';

var Todo = React.createClass({
    render() {
        return (
            <li>{this.props.title}</li>
        );
    }
});

export default Todo;
