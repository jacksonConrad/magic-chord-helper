import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

class NavbarContainer extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">MAGIC CHORD HELPER</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default NavbarContainer;
