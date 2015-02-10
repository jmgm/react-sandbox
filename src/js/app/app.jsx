import React from 'react';
import SearchForm from './components/search-form';
import TodoList from './components/todo-list';
import NewForm from './components/new-form';

var App = React.createClass({
    render() {
    	return (
    		<div>
    			<SearchForm />
    			<TodoList />
    			<NewForm />
    		</div>
    	);
    }
});

export default App;
