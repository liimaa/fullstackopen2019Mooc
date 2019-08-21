import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '05050123454' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
  
  const listPersons = () =>
    persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          Number: <input value={newNumber} onChange={handleNumberChange} />
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