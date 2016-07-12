import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,compose } from 'redux';
import { Router, Route, Link, browserHistory} from 'react-router';

import reducer from './reducers/index.js';
import App from './App';

import GettingStarted from 'raw!./readings/GettingStarted.md';
import OCCIProject from 'raw!./readings/OCCIProject.md';

var initialState =  {
  'currentPath': '/-/',
  'currentJSON': 'hello world',
  'errorMessage': '',
  'currentScheme': ''
}


let store = createStore(reducer, initialState);

const readings =[
    {'title':'Getting started', 'path': 'gettingstarted', 'component': GettingStarted},
    {'title':'The OCCI Project', 'path': 'OCCIProject', 'component': OCCIProject},
  ]
;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} readings={readings}>
        {readings.map(function(reading, i){
          return <Route path={reading.path} key={reading+i}/>;
        }, this)}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
