import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { addNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  
  const { anecdotes } = props.store.getState()
  

  const handleVote = (anecdote) => {
    props.store.dispatch(voteAnecdote(anecdote.id))
    props.store.dispatch(addNotification('You voted: ' + anecdote.content))
    setTimeout(() => props.store.dispatch(hideNotification()), 5000)
  }

  const sorter = (data, prop, asc) => {
    return data.sort((a, b) => {
      return asc ? a[prop] - b[prop] : b[prop] - a[prop]
    })
  }

  return(
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
    </div>
  )
}

export default AnecdoteList