import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavbarContainer from './Containers/NavbarContainer.js';
import ChordGrid from './Containers/ChordGrid.js'

class App extends Component {
  render() {
    console.log('rendering app...')
    console.log(this.props)
    return (
      <div className="App">
        <NavbarContainer />

        <ChordGrid store={this.props.store} />

      </div>
    );
  }
}

export default App;
