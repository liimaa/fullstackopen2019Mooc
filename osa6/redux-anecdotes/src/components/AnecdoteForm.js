import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({addAnecdote}) => {

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
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