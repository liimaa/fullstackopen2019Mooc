import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { addNotification } from '../reducers/notificationReducer'
import { Button, Form, Row, Col } from 'react-bootstrap';

const Blog = ({blog, user, removeBlog, likeBlog, addComment, addNotification}) => {
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

  const handleComment = (event) => {
    event.preventDefault()
    addComment(blog, event.target.comment.value)
    event.target.reset()
  }

  return (
    <div className='blog-item'>
      <div>
        <h2>{blog.title}</h2>
        <div><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></div>
        <div> likes {blog.likes} <Button onClick={handleLike}>like</Button> </div>
        <div>added by {blog.user.name}</div>
        {blog.user.username === user.username ?
          <Button onClick={handleRemove}>remove</Button> : null}
      </div>
      <Form onSubmit={handleComment}>
        <Row>
          <Col>
            <Form.Control type='text' name='comment' />
          </Col>
          <Col>
            <Button type='onsubmit'>add comment</Button>
          </Col>
        </Row>
      </Form>
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
  addNotification,
  addComment
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