import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { addNotification } from '../reducers/notificationReducer'

const Blog = ({blog, user, removeBlog, likeBlog, addNotification}) => {
  if (!blog) {
    return null
  }

  const handleLike = () => {
    likeBlog(blog)
  }

  const handleRemove = () => {
    if(window.confirm(`Are you sure you want to remove blog
      ${blog.title} ${blog.author}`)) {
      removeBlog(blog.id)
      addNotification({message:`blog: ${blog.title} ${blog.author} removed`, type:'success'}, 3.20)
    }
  }

  return (
    <div className='blog-item'>
      <h2>{blog.title}</h2>
      <div><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></div>
      <div> likes {blog.likes} <button onClick={handleLike}>like</button> </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === user.username ?
        <button onClick={handleRemove}>remove</button> : null}
      <h3>comments</h3>
      <ul>{blog.comments.map((comment, i) => <li key={comment + i}>{comment}</li>)}</ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  //console.log(ownProps, "ownProps");
  return {
    user: state.user,
    blog: ownProps.blog
  }
}

const mapDispatchToProps = {
  removeBlog,
  likeBlog,
  addNotification
}

Blog.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string
  }).isRequired,

  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    id: PropTypes.string,
  }),

  removeBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)