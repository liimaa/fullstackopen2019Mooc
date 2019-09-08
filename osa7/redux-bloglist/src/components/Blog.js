import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const [richView, setRichView] = useState(false)
  if (props === undefined) {
    return null
  }
  console.log(props);
  const handleLike = async (event, blog) => {
    event.stopPropagation()
    props.likeBlog(blog)
  }

  const handleRemove = async (event, blog) => {
    event.stopPropagation()
    if(window.confirm(`Are you sure you want to remove blog
      ${blog.title} ${blog.author}`)) {
      props.removeBlog(blog.id)
    }
  }

  return (
    richView
    ?
    <div className='blog-item rich' onClick={() => setRichView(false)}>
      <div> {props.title} {props.author} </div>
      <div> {props.url} </div>
      <div> likes {props.likes} <button onClick={(event) => handleLike(event, props)}>like</button> </div>
      <div> added by {props.user.name} </div>
      {props.user.username === props.currentUser.username ?
        <button onClick={(event) => handleRemove(event, props)}>remove</button> : null}
    </div>
    :
    <div className='blog-item' onClick={() => setRichView(true)}>
      {props.title} {props.author}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
}

const mapDispatchToProps = {
  removeBlog,
  likeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)