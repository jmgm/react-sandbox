import React from 'react';
import todoStore from './stores/todo-store';
import NewForm from './components/new-form';
import SearchForm from './components/search-form';
import TodoList from './components/todo-list';

var App = React.createClass({
    componentDidMount() {
        todoStore.on('changed', this.onTodosChanged);
    },

    getInitialState() {
        return { data: todoStore.getData() };
    },

    render() {
        return (
            <div className="Content">
                <NewForm />
                
                /*<SearchForm />*/
                
                <TodoList data={this.state.data} />
            </div>
        );
    },

    onTodosChanged() {
        this.setState({ data: todoStore.getData() });
    }
});

export default App;
