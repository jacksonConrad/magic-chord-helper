import React, { Component } from 'react';
import MajorSelector from './MajorSelector.js'
import MinorSelector from './MinorSelector.js'
import DiminishedSelector from './DiminishedSelector.js'

class Chord extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    let nextValue
    if (this.props.value > 0) {
      nextValue = 0
    } else if (this.props.value === 0) {
      nextValue = this.props.suggestion === 0 ? 1 : this.props.suggestion
      // nextValue = 1
    }
    this.props.handleChordChange(this.props.tonic, nextValue)
  }

  selectMajor = (e) => {
    this.props.handleChordChange(this.props.tonic, 1)
  }

  selectMinor = (e) => {
    this.props.handleChordChange(this.props.tonic, 2)
  }

  selectDiminished = (e) => {
    this.props.handleChordChange(this.props.tonic, 3)
  }

  isModeActive = (mode) => {
    // if the mode is selected, active is true
    // if the mode is suggsted, active is true
    const modeMap = { 'major': 1, 'minor': 2, 'diminished': 3 }
    if (this.props.value === modeMap[mode]) {
      return true
    } else if (this.props.suggestion === modeMap[mode]) {
      return true
    } else {
      return false
    }
  }

  render() {
    var classes = "chord "

    if (this.props.value > 0) {
      classes += "active "
    } else if (this.props.suggestion > 0) {
      classes += "suggested "
    }

    let majorActive = this.isModeActive('major')
    let minorActive = this.isModeActive('minor')
    let diminishedActive = this.isModeActive('diminished')

    return (
      <div className={classes} onClick={this.handleClick}>
        <span class="chord-display">{this.props.displayChord}</span>
        <div className='mode-selector'>
          <MajorSelector active={majorActive} selectMode={this.selectMajor} />
          <MinorSelector active={minorActive} selectMode={this.selectMinor} />
          <DiminishedSelector active={diminishedActive} selectMode={this.selectDiminished} />
        </div>
      </div>
    );
  }
}

export default Chord;
