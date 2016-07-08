import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,compose } from 'redux';
import { Router, Route, Link, browserHistory} from 'react-router';

import reducer from './reducers/index.js';
import App from './App';
import GettingStarted from './readings/GettingStarted.md';

let store = createStore(reducer, /*myInitialState*/);

const readings =[
    {'title':'Getting started', 'path': 'gettingstarted', 'component': GettingStarted},
  ]
;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} readings={readings}>
        {readings.map(function(reading, i){
          return <Route path={reading.path} currentReading={reading.component} key={reading+i}/>;
        }, this)}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
