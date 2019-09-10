import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const User = ({user}) => {
  if (!user) {
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