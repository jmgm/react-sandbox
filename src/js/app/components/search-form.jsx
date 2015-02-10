import React from 'react';

var SearchForm = React.createClass({
    render() {
        return (
            <input
                className="TextInput"
                type="text"
                placeholder="search"
            />
        );
    }
});

export default SearchForm;
