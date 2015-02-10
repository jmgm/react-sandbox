import React from 'react';

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
	    	this.props.onSubmit({ content });
	    	contentNode.value = '';
    	}
    }
});

export default NewForm;
