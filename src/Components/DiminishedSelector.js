import React, { Component } from 'react';

class DiminishedSelector extends Component {

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
      <div className={'diminished mode-display ' + active + " " + this.props.classes } onClick={ this.handleClick }>Dim</div>
    )
  }
}

export default DiminishedSelector;
