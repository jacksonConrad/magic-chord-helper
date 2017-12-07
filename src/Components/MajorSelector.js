import React, { Component } from 'react';

class MajorSelector extends Component {

  handleClick = (e) => {
    e.stopPropagation();
    this.props.selectMode();
  }

  render() {
    let active = '';
    if (this.props.active) {
      active = 'selected';
    }
    return (
      <div className={'major mode-display ' + active} onClick={ this.handleClick }>Maj</div>
    )
  }
}

export default MajorSelector;
