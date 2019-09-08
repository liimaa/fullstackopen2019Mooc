import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../reducers/userReducer'
import { useField } from '../hooks/index'
import { addNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const LoginForm = ({addUser, addNotification}) => {

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    addUser({username: username.value, password: password.value})
    .catch(() => addNotification({message: 'Wrong username or password', type:"error"}, 3.20))
  }

  return(
    <div>
      <h2>Login please</h2>
      <form onSubmit={handleLogin}>
        username:
        <input {...username}/><br />
        password:
        <input {...password}/><br />
        <button type='submit'>login</button>
      </form>
    </div>
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