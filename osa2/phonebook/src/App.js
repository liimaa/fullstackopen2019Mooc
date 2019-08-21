import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilter] = useState('')

  const handleNewPerson = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, {name: newName, number: newNumber}])
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonFilter = (event) => {
    setFilter(event.target.value)
  }

  const listPersons = () => {
    let filterd = persons.filter(person => person.name.toLowerCase().includes(filterValue))
    return filterd.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter persons: <input value={filterValue} onChange={handlePersonFilter} />

      <h2>add new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} /> <br />
          Number: <input value={newNumber} onChange={handleNumberChange} /> <br />
        </div>
        <div>
          <button type="submit" onClick={handleNewPerson}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
        {listPersons()}
    </div>
  )
}

export default App