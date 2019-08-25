import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';

const App = () => {

  const blogFormRef = React.createRef()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [] )

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if(user) {
      let u = JSON.parse(user)
      setUser(u)
      blogService.setToken(u.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const login = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(login))
      setPassword('')
      setUsername('')
      setUser(login)
      blogService.setToken(login.token)
    } catch (error) {
      setNotification({ message:'Wrong username or password', type: 'error' })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleBlog = async (blog) => {
    const response = await blogService.create(blog)
    blogFormRef.current.toggleVisibility()
    setBlogs([...blogs, response])
    setNotification({message: `a new blog: ${blog.title} ${blog.author}`, type: 'success'})
    setTimeout(() => setNotification(null), 3000)
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

  const handleLike = async (event, blog) => {
    event.stopPropagation()
    let newblog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      userID: blog.user.id
    }
    await blogService.update(blog.id, newblog)
    let newBlogs = blogs.map(b => {
      return b.id === blog.id ? { ...b, likes: newblog.likes } : b
    })
    setBlogs(newBlogs)
  }

  return (
    <div>
      <Notification {...notification} />
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
          <Togglable label="new blog" ref={blogFormRef}>
              <BlogForm handleBlog={handleBlog}/>
          </Togglable>

          {blogs.map(blog =>       
            <Blog key={blog.id} 
              {...blog} 
              handleLike={handleLike}

            />
          )}
        </div>
      }
    </div>
  )
}


export default App;
