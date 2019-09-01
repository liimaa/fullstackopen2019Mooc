import React from 'react';
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({anecdotesToShow, voteAnecdote,
  addNotification}) => {

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote)
    addNotification(`You voted: '${anecdote.content}'`, 3.20)
  }
  
  return(
    <div>
      <h2>Anecdotes</h2>
      {anecdotesToShow.map(anecdote =>
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

const mapDispatchToProps = {
  addNotification,
  voteAnecdote
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: sorter(state.anecdotes, 'votes', false, state.filter)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
