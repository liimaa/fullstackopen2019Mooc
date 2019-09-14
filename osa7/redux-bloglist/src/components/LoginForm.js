import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../reducers/userReducer'
import { useField } from '../hooks/index'
import { addNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import { Form, Button, Container, Jumbotron } from 'react-bootstrap'

const LoginForm = ({ addUser, addNotification }) => {

  const username = useField('text')
  const password = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()
    addUser({ username: username.value, password: password.value })
      .catch(() => addNotification({ message: 'Wrong username or password', type:'danger' }, 3.20))
  }

  return(
    <Container>
      <Jumbotron className='bg-light'>
        <Form onSubmit={handleLogin}>
          <h2>Login please</h2>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control data-cy='username' {...username} />
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control data-cy='password' {...password} />
          </Form.Group>
          <Button data-cy='login' type='submit'>login</Button>
        </Form>
      </Jumbotron>
    </Container>
  )
}
const mapDispatchToProps = {
  addUser,
  addNotification
}

LoginForm.propTypes = {
  addUser: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)