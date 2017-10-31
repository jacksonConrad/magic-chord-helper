import React, { Component } from 'react';
import ChordGrid from '../Containers/ChordGrid'
import { connect } from 'react-redux'
import { addChord, removeChord } from '../Actions'
import MajorSelector from './MajorSelector.js'
import MinorSelector from './MinorSelector.js'

class Chord extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { active: this.props.active, mode: this.props.mode };
  //   this.handleClick = this.handleClick.bind(this);
  //   this.selectMajor= this.selectMajor.bind(this);
  //   this.selectMinor= this.selectMinor.bind(this);
  // }

  handleClick = () => {
    console.log(this.props)
    this.props.handleChordChange(this.props.tonic)
    // var active;
    // if (this.state.active == 'active') {
    //   active = '';
    // } else {
    //   active = 'active';
    // }
    // this.setState({active: active});
  }

  selectMajor = (e) => {
    // this.setState({mode: 'major'});
  }

  selectMinor = (e) => {
    // this.setState({mode: 'minor'});
  }

  mapStateToProps = state => {
    return {
      selectedChords: state.selectedChords
    }
  }

  mapDispatchToProps = dispatch => {
    return {
      // handleClick: chord => {
      //   dispatch(addChord(chord))
      // }
    }
  }

  isChordSelected = (chord) => {
    // let selectedChords = this.props.getState().selectedChords
    // console.log(selectedChords)
  }

  render() {

    var classes = "chord " + this.props.active;

    var selectedMode;

    return (
      <div className={classes} onClick={this.handleClick}>
        <span>{this.props.tonic}</span>
        <div className='mode-selector'>
          <MajorSelector active={this.props.mode === 'major'} selectMode={this.selectMajor} />
          <MinorSelector active={this.props.mode === 'minor'} selectMode={this.selectMinor} />
        </div>
      </div>
    );
  }
}

// Chord = connect(this.mapStateToProps, this.mapDispatchToProps)(Chord)

export default Chord;
