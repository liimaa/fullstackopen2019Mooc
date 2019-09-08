import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import './App.css'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const App = ({initBlogs, initUser, initUsers, user, users, blogs}) => {

  useEffect(() => {
    initBlogs() // eslint-disable-next-line
    initUser() // eslint-disable-next-line
    initUsers() // eslint-disable-next-line
  }, [])

  const findById = (id, arr) =>
    arr.find(a => a.id === id)

  return (
    <div>
      {!user ? 
      <>
        <Notification />
        <LoginForm />
      </>
      :
      <Router>
        <Navigation />
        <Notification />
        <Route exact path="/" render={() => <Blogs />} />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/users/:id" render={({match}) =>
          <User user={findById(match.params.id, users)} />
        }/>
        <Route exact path="/blogs/:id" render={({match}) =>
          <Blog blog={findById(match.params.id, blogs)} />
        }/>
      </Router>
      }
    </div>
  )
}

const mapDispatchToProps = {
  initBlogs,
  initUser,
  initUsers
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
