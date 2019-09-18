import React from 'react'

const LoginForm = ({ show, login, setToken, handleError }) => {
  if (!show) {
    return null
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const result = await login({
      variables: { 
        username: event.target.username.value,
        password: event.target.password.value
      }
    }).catch(error => handleError(error))
    
    if (result) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('books-user-token', token)
    }
  }

  return(
    <form onSubmit={handleLogin}>
      username: <input name='username' /><br />
      password: <input type='password' name='password' /><br />
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm