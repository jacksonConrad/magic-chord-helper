import React, { Component } from 'react';

class MajorSelector extends Component {
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
      // <div className={'major ' + active} onClick={ () => this.props.selectMode() }>M</div>
      <div className={'major ' + active} onClick={ this.handleClick }>M</div>
    )
  }
}

export default MajorSelector;
