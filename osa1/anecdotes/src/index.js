import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)

  const anecdoteVotes = Array.apply(null, 
    new Array(anecdotes.length)).map(Number.prototype.valueOf, 0);

  const [votes, setVote] = useState(anecdoteVotes)

  const randomIndex = arr => Math.floor(Math.random() * arr.length)

  const handleRndAnecdote = () => {
    const randomAnecdoteIndex = randomIndex(anecdotes)
    setSelected(randomAnecdoteIndex)
  }

  const handleVote = () => {
    let voteCopy = [...votes];
    voteCopy[selected] += 1
    setVote(voteCopy)
  }

  return (
    <div>
      <p>{anecdotes[selected]} has {votes[selected]} </p>
      <button onClick={handleRndAnecdote}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)