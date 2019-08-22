import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('Test')
  const [newNumber, setNewNumber] = useState('7777')
  const [filterValue, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({message: '', type: ''})

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNewPerson = (event) => {
    event.preventDefault()
    let newPerson = {name: newName, number: newNumber}
    let oldperson = persons.find(person => person.name === newName)
    if(oldperson) {
      if(window.confirm(`${newName} is already added to phonebook, want to update?`)) {
        handleUpdate(oldperson.id, newPerson)
      }
      return
    }
    personService.create(newPerson)
      .then(person => {
        setPersons([...persons, person])
        setErrorMessage({message: `Added ${newName}`, type: 'success'})
        setTimeout(() => setErrorMessage({}), 3000);
      })
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

  const filteredPersons = () => {
    console.log(persons);
    return persons.filter(person => person.name.toLowerCase().includes(filterValue))
  }

  const handlePersonDelete = (event) => {
    let { id, name } = event.target
    if(window.confirm(`Do you want to delete ${name}`)) {
      const newPersons = persons.filter(person => person.id !== Number(id))
      setPersons([...newPersons])
      personService.remove(id)
    }
  }

  const handleUpdate = (id, newPerson) => {
    personService.update(id, newPerson)
      .then(servicePerson => {
        setPersons(persons.map(person => person.id !== id ? person : servicePerson))
        setErrorMessage({message: `Updated ${newName}`, type: 'success'})
        setTimeout(() => setErrorMessage({}), 3000);
      })
  }

  return (
    <div>
      <Notification {...errorMessage} />

      <h2>Phonebook</h2>
      <FilterForm 
        onChange={handlePersonFilter} 
        value={filterValue} 
      />

      <h2>add new</h2>
      <PersonForm 
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleNewPerson}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={filteredPersons()}
        handleDelete={handlePersonDelete}
      />
      
    </div>
  )
}

export default App