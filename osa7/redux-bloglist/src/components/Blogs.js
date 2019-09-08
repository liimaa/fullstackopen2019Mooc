import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import { resetUser } from '../reducers/userReducer'

const Blogs = ({blogs, user, resetUser}) => {
    const blogFormRef = React.createRef()

  return(
    <div>
      <h2>Blogs</h2>
      <p>{user.name} has logged in <button onClick={resetUser}>logout</button></p>
    
      <h2>Create new</h2>
      <Togglable label="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    
      {blogs.map(blog =>
        <Blog key={blog.id}
          {...blog}
        />
      ) }
    </div>
  )
}

const sorter = (data, prop, asc) => {
  return data.sort((a, b) => {
    return asc ? a[prop] - b[prop] : b[prop] - a[prop]
  })
}

const mapStateToProps = (state) => {
  return {
    blogs: sorter(state.blogs, 'likes', false),
    user: state.user
  }
}

const mapDispatchToProps = {
  resetUser,
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)