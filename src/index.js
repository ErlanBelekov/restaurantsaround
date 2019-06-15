import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import NotFound from './screens/NotFound';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    </Provider>
,document.getElementById('root'));

serviceWorker.unregister();
