import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './App.css'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'

const App = ({initBlogs, initUser, user}) => {

  useEffect(() => {
    initBlogs() // eslint-disable-next-line
  }, [] )

  useEffect(() => {
    initUser() // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Notification />

      {!user ? <LoginForm /> : <Blogs />}
    </div>
  )
}

const mapDispatchToProps = {
  initBlogs,
  initUser
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
