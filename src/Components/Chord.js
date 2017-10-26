import React, { Component } from 'react';
import MajorSelector from './MajorSelector.js'
import MinorSelector from './MinorSelector.js'

class Chord extends Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active, mode: 'major' };
    this.handleClick = this.handleClick.bind(this);
    this.selectMajor= this.selectMajor.bind(this);
    this.selectMinor= this.selectMinor.bind(this);
  }

  handleClick() {
    var active;
    if (this.state.active == 'active') {
      active = '';
    } else {
      active = 'active';
    }
    this.setState({active: active});
  }

  selectMajor(e) {
    this.setState({mode: 'major'});
  }

  selectMinor(e) {
    this.setState({mode: 'minor'});
  }

  render() {
    // console.log(this.state);
    var classes = "chord " + this.state.active;

    var selectedMode;

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

export default Chord;
