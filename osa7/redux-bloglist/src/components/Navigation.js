import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { resetUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Navigation = ({user, logout}) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <div style={{background: 'wheat'}}>
        <p style={{padding: "0.5em"}}>
          <Link style={{marginRight:"0.25em"}} to={`/`}>Blogs</Link>
          <Link style={{marginRight:"0.25em"}} to={`/users`}>Users</Link>
          {user.name} has logged in <button onClick={logout}>logout</button>
        </p>
        
      </div>
      <h2>Blog app</h2>
    </div>
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
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
