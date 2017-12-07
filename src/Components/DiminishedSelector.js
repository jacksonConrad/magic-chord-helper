import React, { Component } from 'react';

class DiminishedSelector extends Component {
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
      <div className={'diminished ' + active } onClick={ this.handleClick }>Dim</div>
    )
  }
}

export default DiminishedSelector;
