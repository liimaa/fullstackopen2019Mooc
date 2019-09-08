import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Users = ({users}) => {

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
        {users.map(user =>
          <tr key={user.id}>
              <td>
                <Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link>
              </td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

Users.propTypes = {
  users:  PropTypes.arrayOf(PropTypes.shape({
    blogs: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      likes: PropTypes.number,
      id: PropTypes.string
    })).isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired
}

export default connect(
  mapStateToProps,
)(Users)