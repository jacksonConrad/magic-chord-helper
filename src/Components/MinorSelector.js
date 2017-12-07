import React, { Component } from 'react';

class MinorSelector extends Component {

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
      <div className={'minor ' + active } onClick={ this.handleClick }>Min</div>
    )
  }
}

export default MinorSelector;
