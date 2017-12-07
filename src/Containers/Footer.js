import React, { Component } from 'react'
import { Well } from 'react-bootstrap'

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.props.selectMode();
  }

  render() {
    return (
      <Well className='footer'>
        <a href='https://github.com/joeldmikk/songer-react' className="plain-link">Source Code</a>&nbsp;&nbsp;//&nbsp;&nbsp;
        <a href='https://en.wikipedia.org/wiki/Circle_of_fifths' className="plain-link">Circle of Fifths</a>&nbsp;&nbsp;//&nbsp;&nbsp;
        <a href='http://www.joelmikkelsen.com/'  className="plain-link">&copy; Joel Mikkelsen, 2017</a><br/>
      </Well>
    )
  }
}

export default Footer;
