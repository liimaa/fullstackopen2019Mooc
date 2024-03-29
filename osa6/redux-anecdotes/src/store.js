import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

export default createStore(reducer, 
  composeWithDevTools(
  applyMiddleware(thunk)
  )
)