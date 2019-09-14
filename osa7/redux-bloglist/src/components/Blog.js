import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { addNotification } from '../reducers/notificationReducer'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const Blog = ({ blog, user, removeBlog, likeBlog, addComment, addNotification, history }) => {
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
      addNotification({ message:`blog: ${blog.title} ${blog.author} removed`, type:'success' }, 3.20)
      history.push('/')
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    if(event.target.comment.value === '') return
    addComment(blog, event.target.comment.value)
    event.target.reset()
  }

  return (
    <div style={{ 'border': '0.1em solid #17a2b8', 'padding': '1em' }}>
      <div>
        <h2>{blog.title}</h2>
        <p><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
        <Row>
          <Col xs={4} md={2}>
            <p data-cy='likes'>likes {blog.likes}</p>
          </Col>
          <Col>
            <Button data-cy='like' size="sm" variant="outline-success" onClick={handleLike}>like</Button>
          </Col>
        </Row>
        <p>added by {blog.user.name}</p>
        <p>
          {blog.user.username === user.username ?
            <Button data-cy='remove' size="sm" variant="outline-danger" onClick={handleRemove}>remove</Button> : null}
        </p>
      </div>
      <h3>comments</h3>
      <Form onSubmit={handleComment}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control data-cy='comment' type='text' name='comment' />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Button data-cy='add comment' type='onsubmit'>add comment</Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div>
        <ul>{blog.comments.map((comment, i) => <li key={comment + i}>{comment}</li>)}</ul>
      </div>
      <p>
      </p>
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

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Blog)