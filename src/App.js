import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavbarContainer from './Containers/NavbarContainer.js';
import ChordGrid from './Containers/ChordGrid.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarContainer />

        <ChordGrid />
        
      </div>
    );
  }
}

export default App;
