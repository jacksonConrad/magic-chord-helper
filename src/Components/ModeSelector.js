import React, { Component } from 'react';

class ModeSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mode = this.props.mode;
    return (
      <div className="mode-selector">
        <div className='major selected' onClick={this.props.selectMode('major')}>M</div>
        <div className='minor' onClick={this.props.selectMode('minor')}>m</div>
      </div>
    )
  }
}

export default ModeSelector;
