import React, { useState } from 'react'

const Blog = (blog) => {
  const [richView, setRichView] = useState(false)

  return (
    richView
    ?
    <div className='blog-item rich' onClick={() => setRichView(false)}>
      <div> {blog.title} {blog.author} </div>
      <div> {blog.url} </div>
      <div> likes {blog.likes} <button onClick={(event) => blog.handleLike(event, blog)}>like</button> </div>
      <div> added by {blog.user.name} </div>
      <button onClick={(event) => blog.handleRemove(event, blog)}>remove</button>
    </div>
    :
    <div className='blog-item' onClick={() => setRichView(true)}>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog