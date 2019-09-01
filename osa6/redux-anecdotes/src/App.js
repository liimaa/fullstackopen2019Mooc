import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {
  /*
      <Notification store={props.store} />
*/
  return (
    <div>
      <AnecdoteForm store={props.store} />
      <Filter store={props.store} />
      <AnecdoteList />
    </div>
  )
}

export default App