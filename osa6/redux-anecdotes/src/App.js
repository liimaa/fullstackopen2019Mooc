import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdoteService'

const App = (props) => {

  useEffect(() => {
    anecdoteService.getAll()
    .then(anecdotes => props.initAnecdotes(anecdotes)) // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)