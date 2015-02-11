import React from 'react';
import dispatcher from './dispatcher';
import NewForm from './components/new-form';
import SearchForm from './components/search-form';
import TodoList from './components/todo-list';

var data = [
        { id: 0, content: 'task', tags: ['tag'] }
    ],
    lastId = 0;

var App = React.createClass({
    getInitialState() {
        return { data };
    },

    render() {
        return (
            <div className="Content">
                <NewForm onSubmit={this.onNewSubmit} />
                
                /*<SearchForm />*/
                
                <TodoList
                    todos={this.state.data}
                    onTodoDelete={this.onTodoDelete}
                />
            </div>
        );
    },

    onNewSubmit(t) {
        data.push({
            id: ++lastId,
            content: t.content,
            tags: []
        });

        this.setState({ data });
    },

    onTodoDelete(id) {
        console.log(`deleting ${id}`);
        let i = data.findIndex(el => el.id === id);

        if(i !== -1) {
            data.splice(i, 1);
            this.setState({ data });
        }
    }
});

export default App;
