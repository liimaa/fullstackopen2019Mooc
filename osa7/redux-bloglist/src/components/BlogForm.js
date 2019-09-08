import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = ({addBlog, addNotification}) => {

  const [blog, setBlog] = useState({
    title: '', author: '', url: ''
  })

  const handleBlog = async (blog) => {
    //blogFormRef.current.toggleVisibility()
    addBlog(blog)
    addNotification(`a new blog: ${blog.title} ${blog.author}`, 3.20)
  }

  return(
    <form onSubmit={(event) => {
      event.preventDefault()
      handleBlog(blog)
      event.currentTarget.reset()
    }}>
      title:
      <input
        name='title'
        onChange={({target}) => setBlog({ ...blog, title: target.value })}
        type='text'
      /><br />
      author:
      <input
        name='author'
        onChange={({target}) => setBlog({ ...blog, author: target.value })}
        type='text'
      /><br />
      url:
      <input
        name='url'
        onChange={({target}) => setBlog({ ...blog, url: target.value })}
        type='text'
      /><br />
      <button type='submit'>Post</button>
    </form>
  )
}

const mapDispatchToProps = {
  addBlog,
  addNotification
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)