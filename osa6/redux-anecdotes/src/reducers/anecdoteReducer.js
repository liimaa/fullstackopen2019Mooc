import anecdoteService from "../services/anecdoteService";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  //console.log('action', action, state)
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const newAnecdote = action.data
      return state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote)
    case 'ADD_ANECDOTE':
      const data = action.data
      //{...state, ...data}
      return state.concat(data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update(anecdote.id, {
      content: anecdote.content,
      votes: anecdote.votes + 1 
    })
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    anecdote = { content: anecdote, votes: 0 }
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer