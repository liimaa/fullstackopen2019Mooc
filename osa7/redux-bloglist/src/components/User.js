import React from 'react'
import { connect } from 'react-redux'

const Users = ({user}) => {
  if (user === undefined) {
    return null
  }

  return(
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: ownProps.user
  }
}

export default connect(
  mapStateToProps,
)(Users)