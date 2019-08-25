import React, { useState } from 'react'

const Blog = (blog) => {
  const [richView, setRichView] = useState(false)

  return (
    richView
    ?
    <div className='blog-item rich' onClick={() => setRichView(false)}>
      <div> {blog.title} {blog.author} </div>
      <div> {blog.url} </div>
      <div> likes {blog.likes} <button>like</button></div>
      <div> added by {blog.user.name} </div>
    </div>
    :
    <div className='blog-item' onClick={() => setRichView(true)}>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog