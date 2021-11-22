import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'

export default class NavbarSUI extends Component {
  state = { activeItem: 'Customer' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
<div style={{backgroundColor:"coral",fomtColor:"white"}}>
      <Menu secondary>
        <Menu.Item
          as={NavLink} to="/"
          name='React'
        />
        <Menu.Item
          as={NavLink} to="/Customer"
          name='Customer'
          active={activeItem === 'Customer'}
          onClick={this.handleItemClick}
        />
         <Menu.Item
          as={NavLink} to="/Products"
          name='Products'
          active={activeItem === 'Products'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/Stores"
          name='Stores'
          active={activeItem === 'Stores'}
          onClick={this.handleItemClick}
        />
    
    
        <Menu.Item
          as={NavLink} to="/Sale"
          name='Sale'
          active={activeItem === 'Sale'}
          onClick={this.handleItemClick}
           />
        
      </Menu>
    
      </div>
    )
  }
}