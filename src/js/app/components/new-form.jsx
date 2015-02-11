import React from 'react';
import dispatcher from '../dispatcher';

var NewForm = React.createClass({
    render() {
        return (
            <form className="NewForm" onSubmit={this.onSubmit}>
                <input
                	className="TextInput"
                	type="text"
                	placeholder="New&hellip;"
                	ref="content"
                />
            </form>
        );
    },

    onSubmit(e) {
    	e.preventDefault();

    	let contentNode = this.refs.content.getDOMNode(),
    		content = contentNode.value;

    	if(content) {
	    	dispatcher.dispatch('createTodo', { content });
	    	contentNode.value = '';
    	}
    }
});

export default NewForm;
