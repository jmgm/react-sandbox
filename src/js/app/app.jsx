import React from 'react';
import Todos from './components/todos';

class App {
    constructor() {}

    start() {
        React.render(
            <Todos />,
            document.getElementById('app')
        );
    }
}

export default App;
