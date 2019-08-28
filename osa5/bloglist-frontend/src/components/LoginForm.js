import React from 'react'

const LoginForm = ({username, password, handleLogin}) => {
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

export default LoginForm