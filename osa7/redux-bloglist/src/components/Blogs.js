import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import { NavLink } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap';

const Blogs = ({blogs}) => {
  const blogFormRef = React.createRef()
  return(
    <div>
      <h2>Create new</h2>
      <Togglable label="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef}/>
      </Togglable>
      <ListGroup className='mt-5'>
        {blogs.map(blog =>
          <ListGroup.Item
            as={NavLink} 
            to={`/blogs/${blog.id}`} 
            action variant="primary" 
            key={blog.id}>
            {blog.title}
          </ListGroup.Item>
        )}
      </ListGroup>
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
      token: PropTypes.string,
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