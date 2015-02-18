import Emitter from '../../lib/emitter';
import dispatcher from '../dispatcher';

let filters = {
	state: (el, state) => {
		switch(state) {
			case 'all': return true;
			case 'active': return !el.done;
			case 'done': return el.done;
		}
	}
};

class TodoStore extends Emitter {
	constructor() {
		super();

		this._data = [
			{ id: 0, content: 'Foo', tags: [], done: false },
			{ id: 1, content: 'Bartjuuyuk', tags: [], done: false },
			{ id: 2, content: 'rjyukuilu', tags: [], done: false },
			{ id: 3, content: 'Blah Blah Blag', tags: [], done: false },
			{ id: 4, content: 'Osom task', tags: [], done: false }
		];
		this._lastId = 4; // originally -1

		dispatcher.register(this, {
			'createTodo': 'onCreateTodo',
			'setTodoState': 'onSetTodoState',
			'deleteTodo': 'onDeleteTodo'
		});
	}

	getData(opts = {}) {
		return this._data.filter(el => {
			let pass = true;

			for(let prop in opts) {
				pass = pass && filters[prop](el, opts[prop]);
			}

			return pass;
		});
	}

	onCreateTodo(props) {
		this._data.push({
			id: this._getNewId(),
			content: props.content,
			tags: [],
			done: false
		});

		this.emit('changed');
	}

	onSetTodoState(data) {
		let i = this._data.findIndex(el => el.id === data.id);

		if(i !== -1) {
			this._data[i].done = data.state;
			this.emit('changed');
		}
	}

	onDeleteTodo(id) {
		let i = this._data.findIndex(el => el.id === id);

        if(i !== -1) {
            this._data.splice(i, 1);
            this.emit('changed');
        }
	}

	_getNewId() {
		return ++this._lastId;
	}
}

let todoStore = new TodoStore();

export default todoStore;