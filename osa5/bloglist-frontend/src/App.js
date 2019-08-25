import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';

const App = () => {

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [] )

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if(user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const login = await loginService.login({ username, password })
    window.localStorage.setItem('user', JSON.stringify(login))
    setPassword('')
    setUsername('')
    console.log('handleLogin', login)
    setUser(login)
  }

  const handleUsernameChange = (event) => {
      setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      {
        user === null ?
        <div>
          <h2>Login please</h2>
          <form onSubmit={handleLogin}>
            username:
            <input
              name='username'
              value={username}
              onChange={handleUsernameChange}
              type='text'
            /><br />
            password:
            <input
              name='password'
              value={password}
              onChange={handlePasswordChange}
              type='password'
            /><br />
            <button>login</button>
          </form>
        </div>
        :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} has logged in</p>
          {blogs.map(blog =>       
            <Blog
              loggedUser={user}
              key={blog.id} {...blog}
            />
          )}
        </div>
      }
    </div>
  )
}


export default App;
