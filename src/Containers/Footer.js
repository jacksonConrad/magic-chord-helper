import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

class Footer extends Component {

  handleClick = (e) => {
    e.stopPropagation();
    this.props.selectMode();
  }

  render() {
    const footer =  <div className="footer-links">
                      <a href='https://github.com/joeldmikk/songer-react' className="plain-link">SOURCE</a>&nbsp;&nbsp;\\&nbsp;&nbsp;
                      <a href='https://en.wikipedia.org/wiki/Circle_of_fifths' className="plain-link">CIRCLE OF FIFTHS</a>&nbsp;&nbsp;\\&nbsp;&nbsp;
                      <a href='http://www.joelmikkelsen.com/' className="plain-link">&copy; 2017</a>
                    </div>

    return (
    <div className='footer-wrapper'>
      <div className='footer'>
        <div className='color-swatches-wrap'>
          <div class="green swatch"></div>SELECTED
          &nbsp;&nbsp;\\&nbsp;&nbsp;
          <div class="yellow swatch"></div>SUGGESTED
        </div>
        <div className="footer-links">
          <a href='https://github.com/joeldmikk/songer-react' className="plain-link">SOURCE</a>&nbsp;&nbsp;\\&nbsp;&nbsp;
          <a href='https://en.wikipedia.org/wiki/Circle_of_fifths' className="plain-link">CIRCLE OF FIFTHS</a>&nbsp;&nbsp;\\&nbsp;&nbsp;
          <a href='http://www.joelmikkelsen.com/' className="plain-link">&copy; 2017</a>
        </div>
      </div>
    </div>
    )
  }
}

export default Footer;
