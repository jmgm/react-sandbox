class Emitter {
	constructor() {
        this._listeners = {};
    }

    on(event, handler, context) {
        this._setHandler(event, context ? handler.bind(context) : handler);
        return this;
    }

    emit(event, data) {
        let handlers = this._listeners[event];

        if(handlers) {
            let l = handlers.length;
            
            for(let i = 0; i < l; ++i) {
                handlers[i](data);
            }
        }

        return this;
    }

    _setHandler(event, handler) {
        let handlers = this._listeners[event] ||
            (this._listeners[event] = []);
        
        handlers.push(handler);
    }
}

export default Emitter;