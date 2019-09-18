import React from 'react'

const Books = ({books, show}) => {

  console.log(books.data);

  if (!show) return null
  if (books.loading) return <p>Loading...</p>
  if (books.error) return <p>Error :(</p>

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books