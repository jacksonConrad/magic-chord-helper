import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addChord, removeChord } from '../Actions'
import MajorSelector from './MajorSelector.js'
import MinorSelector from './MinorSelector.js'

class Chord extends Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active, mode: this.props.mode };
  }

  handleClick = () => {
    this.props.handleChordChange(this.props.tonic)
    let nextActive = !this.state.active
    this.setState({ active: nextActive})
  }

  selectMajor = (e) => {
    this.setState({mode: 'major', active: true});
  }

  selectMinor = (e) => {
    let nextActive = !this.state.active
    this.setState({mode: 'minor', active: true});
  }

  render() {
    var classes = "chord "

    if (this.state.active) {
      classes += "active"
    }

    var selectedMode

    return (
      <div className={classes} onClick={this.handleClick}>
        <span>{this.props.tonic}</span>
        <div className='mode-selector'>
          <MajorSelector active={this.state.mode === 'major'} selectMode={this.selectMajor} />
          <MinorSelector active={this.state.mode === 'minor'} selectMode={this.selectMinor} />
        </div>
      </div>
    );
  }
}

// Chord = connect(this.mapStateToProps, this.mapDispatchToProps)(Chord)

export default Chord;
