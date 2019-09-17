import React from 'react'

const Authors = ({updateBorn, authors, show, handleError}) => {

  if (!show) return null
  if (authors.loading) return <p>Loading...</p>
  if (authors.error) return <p>Error :(</p>

  const handleBorn = (event) => {
    event.preventDefault()
    try {
      const name = event.target.name.value
      const born = Number(event.target.born.value)
      const a = authors.data.allAuthors.find(n => n.name === name)
      updateBorn({variables: { id: a.id, name, born }})
      event.target.reset()
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birth year</h2>
      <form onSubmit={handleBorn}>
        name: <input name='name' /><br />
        born: <input name='born' /><br />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors