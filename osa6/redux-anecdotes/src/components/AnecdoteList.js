import React from 'react';
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { addNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({anecdotes, filter, voteAnecdote,
  hideNotification, addNotification}) => {
  

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote.id)
    addNotification('You voted: ' + anecdote.content)
    setTimeout(() => hideNotification(), 5000)
  }

  const sorter = (data, prop, asc, filtering) => {
    data = data.sort((a, b) => {
      return asc ? a[prop] - b[prop] : b[prop] - a[prop]
    })
    if(filtering) {
      data = data.filter(str => 
        str.content.toLowerCase().indexOf(filtering.toLowerCase()) >= 0
      )
    }
    return data
  }
  
  return(
    <div>
      <h2>Anecdotes</h2>
      {sorter(anecdotes, 'votes', false, filter).map(anecdote =>
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

const mapDispatchToProps = {
  addNotification,
  hideNotification,
  voteAnecdote
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
