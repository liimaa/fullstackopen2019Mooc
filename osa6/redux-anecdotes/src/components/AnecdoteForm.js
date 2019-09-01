import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = ({addAnecdote}) => {

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    let content = {content: event.target.anecdote.value, votes: 0}
    event.target.anecdote.value = ''
    content = await anecdoteService.create(content)
    addAnecdote(content)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)