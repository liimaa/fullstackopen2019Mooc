import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const Blogs = ({blogs}) => {
  const blogFormRef = React.createRef()
  return(
    <div>
      <h2>Create new</h2>
      <Togglable label="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef}/>
      </Togglable>
    
      {blogs.map(blog =>
        <div className='blog-item' key={blog.id}> 
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
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

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    id: PropTypes.string,
  })).isRequired
}

export default connect(
  mapStateToProps,
)(Blogs)