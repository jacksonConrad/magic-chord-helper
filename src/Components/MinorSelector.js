import React, { Component } from 'react';

class MinorSelector extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }

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
      <div className={'minor ' + active } onClick={ this.handleClick }>m</div>
    )
  }
}

export default MinorSelector;
