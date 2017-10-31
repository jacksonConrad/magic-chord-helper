import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import chordGrid from './Reducers/chordGrid'
// import initialState from './Reducers/initialState'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const initialState =  {
                        chords: [ 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#' ],
                        tonic: null,
                        chordsInKey: [],
                        selectedChords: [],
                        nominatedChords: []
                      }

const store = createStore(chordGrid, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
