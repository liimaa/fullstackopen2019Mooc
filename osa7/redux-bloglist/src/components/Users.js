import React from 'react'
import { connect } from 'react-redux'

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
          <td>{user.name}</td>
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

export default connect(
  mapStateToProps,
)(Users)