import React, { Component } from 'react';
import './App.css';
import ChordGrid from './Containers/ChordGrid.js'
import Footer from './Containers/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChordGrid />

        <Footer />
      </div>
    );
  }
}

export default App;
