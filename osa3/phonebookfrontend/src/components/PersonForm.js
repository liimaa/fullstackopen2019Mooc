import React from 'react'

const PersonForm = ({name, number, handleNameChange,
   handleNumberChange, handleSubmit}) => {
  return(
    <form>
    <div>
      name: <input value={name} onChange={handleNameChange} /> <br />
      Number: <input value={number} onChange={handleNumberChange} /> <br />
    </div>
    <div>
      <button type="submit" onClick={handleSubmit}>add</button>
    </div>
  </form>
  )
}

export default PersonForm