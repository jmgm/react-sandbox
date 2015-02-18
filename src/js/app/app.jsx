import React from 'react';
import todoStore from './stores/todo-store';
import filterStore from './stores/filter-store';
import NewForm from './components/new-form';
import SearchForm from './components/search-form';
import TodoList from './components/todo-list';
import StateFilter from './components/state-filter';

var App = React.createClass({
    componentDidMount() {
        todoStore.on('changed', this.onTodosChanged);
        filterStore.on('changed', this.onFiltersChanged);
    },

    getInitialState() {
        let filters = filterStore.getData();
        
        return {
            todos: todoStore.getData(filters),
            filters: filters
        };
    },

    render() {
        return (
            <div className="Content">
                <header className="Content--top">
                    <NewForm />
                </header>
                
                <TodoList data={this.state.todos} />

                <footer className="Content--bottom">
                    <StateFilter filter={this.state.filters.state} />
                </footer>
            </div>
        );
    },

    onTodosChanged() {
        this.setState({ todos: todoStore.getData(this.state.filters) });
    },

    onFiltersChanged() {
        let filters =  filterStore.getData();

        this.setState({
            todos: todoStore.getData(filters),
            filters: filters
        });
    }
});

export default App;
