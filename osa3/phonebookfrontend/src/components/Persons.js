import React from 'react'

const Persons = ({persons, handleDelete}) => {
  return(
    persons.map(person => 
      <p key={person.name}>
        {person.name} {person.number}
        <button id={person.id} name={person.name} onClick={handleDelete}>delete</button>
      </p>
    )
  )
}

export default Persons