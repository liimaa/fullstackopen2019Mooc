import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { resetUser } from '../reducers/userReducer'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Navigation = ({ user, logout }) => {
  if (!user) {
    return null
  }

  return (
    <Navbar bg="info" expand="sm" className='mb-5'>
      <Navbar.Brand>Blog app</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link data-cy='blogs' as={NavLink} to='/'>blogs</Nav.Link>
          <Nav.Link data-cy='users' as={NavLink} to='/users'>Users</Nav.Link>
        </Nav>
        <Navbar.Text style={{ 'marginRight': '0.5em' }}>logged in as {user.name}</Navbar.Text>
        <Button data-cy='logout' variant="primary" onClick={logout}> logout</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout: resetUser
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
