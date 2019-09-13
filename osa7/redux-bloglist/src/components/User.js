import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return(
    <div style={{ 'border': '0.1em solid #17a2b8', 'padding': '1em' }}>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
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

User.propTypes = {
  user: PropTypes.shape({
    blogs: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      likes: PropTypes.number,
      id: PropTypes.string
    })).isRequired,
    name: PropTypes.string,
    username: PropTypes.string,
    token: PropTypes.string
  }).isRequired
}

export default connect(
  mapStateToProps,
)(User)