import React, { Component } from 'react';
import MajorSelector from './MajorSelector.js'
import MinorSelector from './MinorSelector.js'
import DiminishedSelector from './DiminishedSelector.js'

class Chord extends Component {

  handleClick = () => {
    let nextValue
    if (this.props.value > 0) {
      nextValue = 0
    } else if (this.props.value === 0) {
      if (this.props.suggestion === undefined || this.props.suggestion === 0) {
        nextValue = 1
      } else {
        nextValue = this.props.suggestion
      }
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
    var classes = "chord-background "
    let modeClasses = ""

    if (this.props.value > 0) {
      classes += "active "
      modeClasses += "active "
    } else if (this.props.suggestion > 0) {
      classes += "suggested "
      modeClasses += "suggested "
    }

    let majorActive = this.isModeActive('major')
    let minorActive = this.isModeActive('minor')
    let diminishedActive = this.isModeActive('diminished')

    return (
      <div className="chord" onClick={this.handleClick}>
        <div className={classes}>
          <div className="chord-display"><span className="transparent-cutout">{this.props.displayChord}</span></div>
        </div>
        <div className='mode-selector'>
          <MajorSelector active={majorActive} selectMode={this.selectMajor} classes={modeClasses} />
          <MinorSelector active={minorActive} selectMode={this.selectMinor} classes={modeClasses} />
          <DiminishedSelector active={diminishedActive} selectMode={this.selectDiminished} classes={modeClasses} />
        </div>
      </div>
    );
  }
}

export default Chord;
