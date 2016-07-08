import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,compose } from 'redux';
import { Router, Route, Link, browserHistory} from 'react-router';

import reducer from './reducers/index.js';

import App from './App';

let store = createStore(reducer, /*myInitialState*/);

const readings =[
    {'title':'Getting started', 'path': 'gettingstarted', 'component': gettingstart},
  ]
;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path='/' component={UserManual}/>
        {readings.map(function(reading, i){
          return <Route path={reading.path} component={reading.component} key={reading.id}/>;
        }, this)}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
