import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
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
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const login = await loginService.login({ username, password })
    window.localStorage.setItem('user', JSON.stringify(login))
    setPassword('')
    setUsername('')
    setUser(login)
    blogService.setToken(login.token)
  }

  const handleBlog = async (blog) => {
    const response = await blogService.create(blog)
    setBlogs([...blogs, response])
  }

  const handleUsername = (event) => {
      setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const logOut = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div>
      {
        user === null ?
          <LoginForm
            handleLogin={handleLogin}
            handlePassword={handlePassword}
            handleUsername={handleUsername}
          />
        :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} has logged in <button onClick={logOut}>logout</button></p>

          <h2>Create new</h2>
          <BlogForm 
            handleBlog={handleBlog}
          />

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
