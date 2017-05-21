import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';
import AddPanel from './containers/AddPanel';
import { HashRouter as Router, Link, Route } from 'react-router-dom';

let store = createStore(reducers);

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/add" component={AddPanel} />
                <Route exact path="/" component={App} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);