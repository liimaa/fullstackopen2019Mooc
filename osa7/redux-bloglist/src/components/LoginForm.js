import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../reducers/userReducer'
import { useField } from '../hooks/index'
import { addNotification } from '../reducers/notificationReducer'

const LoginForm = ({addUser, addNotification}) => {

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    addUser({username: username.value, password: password.value})
    .catch(() => addNotification('Wrong username or password', 3.20))
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
export default connect(
  null,
  mapDispatchToProps
)(LoginForm)