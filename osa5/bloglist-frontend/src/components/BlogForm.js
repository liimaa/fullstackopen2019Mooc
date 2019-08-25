import React, { useState } from 'react'

const BlogForm = ({handleBlog}) => {

  const [blog, setBlog] = useState({
    title: '', author: '', url: ''
  })

  return(
    <form onSubmit={(event) => {
      event.preventDefault()
      handleBlog(blog)
      event.currentTarget.reset()
    }}>
      title:
      <input
        name='title'
        onChange={ ({ target }) => setBlog({...blog, title: target.value})}
        type='text'
      /><br />
      author:
      <input
        name='author'
        onChange={ ({ target }) => setBlog({...blog, author: target.value})}
        type='text'
      /><br />
      url:
      <input
        name='url'
        onChange={ ({ target }) => setBlog({...blog, url: target.value})}
        type='text'
      /><br />
      <button type='submit'>Post</button>
    </form>
  )
}

export default BlogForm