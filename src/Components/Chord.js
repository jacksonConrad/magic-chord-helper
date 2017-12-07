import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addChord, removeChord } from '../Actions'
import MajorSelector from './MajorSelector.js'
import MinorSelector from './MinorSelector.js'

class Chord extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    let nextValue
    if (this.props.value > 0) {
      nextValue = 0
    } else if (this.props.value === 0) {
      nextValue = 1
    }
    this.props.handleChordChange(this.props.tonic, nextValue)
  }

  selectMajor = (e) => {
    this.props.handleChordChange(this.props.tonic, 1)
  }

  selectMinor = (e) => {
    this.props.handleChordChange(this.props.tonic, 2)
  }

  render() {
    var classes = "chord "

    if (this.props.value > 0) {
      classes += "active"
    }

    var selectedMode

    return (
      <div className={classes} onClick={this.handleClick}>
        <span>{this.props.tonic}</span>
        <div className='mode-selector'>
          <MajorSelector active={this.props.value <= 1} selectMode={this.selectMajor} />
          <MinorSelector active={this.props.value === 2} selectMode={this.selectMinor} />
        </div>
      </div>
    );
  }
}

export default Chord;
