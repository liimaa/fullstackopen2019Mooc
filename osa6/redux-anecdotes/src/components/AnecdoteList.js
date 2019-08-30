import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { addNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  
  const { anecdotes, filter } = props.store.getState()
  

  const handleVote = (anecdote) => {
    props.store.dispatch(voteAnecdote(anecdote.id))
    props.store.dispatch(addNotification('You voted: ' + anecdote.content))
    setTimeout(() => props.store.dispatch(hideNotification()), 5000)
  }

  const sorter = (data, prop, asc, filtering) => {
    data = data.sort((a, b) => {
      return asc ? a[prop] - b[prop] : b[prop] - a[prop]
    })
    if(filtering) {
      data = data.filter(str => 
        str.content.toLowerCase().indexOf(filter.toLowerCase()) >= 0
      )
    }
    return data
  }
  
  return(
    <div>
      <h2>Anecdotes</h2>
      {sorter(anecdotes, 'votes', false, true).map(anecdote =>
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