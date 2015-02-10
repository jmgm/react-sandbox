import React from 'react';
import SearchForm from './components/search-form';
import TodoList from './components/todo-list';
import NewForm from './components/new-form';

var data = [
        { id: 0, content: 'foo', tags: ['abc', 'def'] },
        { id: 1, content: 'bar', tags: [] },
        { id: 2, content: 'zet', tags: ['om'] },
        { id: 3, content: 'gee', tags: ['xyz', '1245'] },
    ],
    lastId = 3;

var App = React.createClass({
    getInitialState() {
        return { data };
    },

    render() {
        return (
            <div className="Content">
                <NewForm onSubmit={this.onNewSubmit} />
                
                <SearchForm />
                
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
