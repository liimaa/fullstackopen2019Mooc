import React from 'react'

const LoginForm = ({handleLogin, handleUsername, handlePassword}) => {
  return(
    <div>
      <h2>Login please</h2>
      <form onSubmit={handleLogin}>
        username:
        <input
          name='username'
          onChange={handleUsername}
          type='text'
        /><br />
        password:
        <input
          name='password'
          onChange={handlePassword}
          type='password'
        /><br />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm