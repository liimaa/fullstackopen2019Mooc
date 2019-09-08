import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = ({addBlog, addNotification, blogFormRef}) => {
  const [blog, setBlog] = useState({
    title: '', author: '', url: ''
  })

  const handleBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    addBlog(blog)
    addNotification({message:`a new blog: ${blog.title} ${blog.author}`, type:'success'}, 3.20)
    event.currentTarget.reset()
  }

  return(
    <form onSubmit={handleBlog}>
      title:
      <input
        name='title'
        onChange={({target}) => setBlog({...blog, title: target.value})}
        type='text'
      /><br />
      author:
      <input
        name='author'
        onChange={({target}) => setBlog({...blog, author: target.value})}
        type='text'
      /><br />
      url:
      <input
        name='url'
        onChange={({target}) => setBlog({...blog, url: target.value})}
        type='text'
      /><br />
      <button type='submit'>Post</button>
    </form>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blogFormRef: ownProps.blogFormRef
  }
}

const mapDispatchToProps = {
  addBlog,
  addNotification
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  blogFormRef: PropTypes.oneOfType([
    PropTypes.func, // for legacy refs
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)