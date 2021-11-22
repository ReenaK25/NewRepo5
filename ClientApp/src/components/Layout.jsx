import React, { Component } from 'react';
import { Container } from 'reactstrap';

import NavBarSUI from "./NavBarSUI"; 

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
    {/*    <NavMenu />
    */}
    <NavBarSUI/>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
