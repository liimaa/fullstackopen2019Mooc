import React from 'react';
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()

  const handleVote = (anecdote) => {
    props.store.dispatch(voteAnecdote(anecdote.id))
  }

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.store.dispatch(addAnecdote(content))
    event.target.reset()
  }

  const sorter = (data, prop, asc) => {
    return data.sort((a, b) => {
      return asc ? a[prop] - b[prop] : b[prop] - a[prop]
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sorter(anecdotes, 'votes', false).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App