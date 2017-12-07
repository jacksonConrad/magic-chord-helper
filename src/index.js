import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import { routerMiddleware } from 'react-router-redux'
// import thunk from 'redux-thunk'
// import initialState from './Reducers/initialState'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);

registerServiceWorker();
