import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import { voteAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()

  const handleVote = (anecdote) => {
    props.store.dispatch(voteAnecdote(anecdote.id))
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
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App