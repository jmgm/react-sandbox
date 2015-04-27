class Dispatcher {
    constructor() {
        this._listeners = {};
    }

    register(store, actions) {
        for(let prop in actions) {
            if(actions.hasOwnProperty(prop)) {
                this._setHandler(prop, store[actions[prop]].bind(store));
            }
        }

        return this;
    }

    dispatch(action, data) {
        let handlers = this._listeners[action];

        if(handlers) {
            let l = handlers.length;

            for(let i = 0; i < l; ++i) {
                handlers[i](data);
            }
        }

        return this;
    }

    _setHandler(action, handler) {
        let handlers = this._listeners[action] ||
            (this._listeners[action] = []);

        handlers.push(handler);
    }
}

let dispatcher = new Dispatcher();

export default dispatcher;
