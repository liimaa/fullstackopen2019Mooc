import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table'

const Users = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <Table bordered hover striped>
        <thead>
          <tr>
            <th>User</th>
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
      </Table>
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
    name: PropTypes.string,
    username: PropTypes.string,
    token: PropTypes.string,
  })).isRequired
}

export default connect(
  mapStateToProps,
)(Users)