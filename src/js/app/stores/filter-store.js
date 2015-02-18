import Emitter from '../../lib/emitter';
import dispatcher from '../dispatcher';

class FilterStore extends Emitter {
	constructor() {
		super();

		this._data = {
			state: 'all'
		};

		dispatcher.register(this, {
			'setStateFilter': 'onSetStateFilter'
		});
	}

	getData() {
		return this._data;
	}

	onSetStateFilter(filter) {
		let f = filter;

		if(['all', 'active', 'done'].indexOf(f) === -1) {
			f = 'all';
		}

		this._data.state = f;
		this.emit('changed');
	}
}

let filterStore = new FilterStore();

export default filterStore;