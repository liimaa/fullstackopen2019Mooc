import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'

const FILTER_BOOKS = gql`
  query filterBooks($genre: String) {
    allBooks(
      genre: $genre
    ) {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      genres
    }
  }
`

const Books = ({ books, show }) => {
  const [genre, setGenre] = useState('')
  const filter = useQuery(FILTER_BOOKS, {
    variables: { genre: genre }
 })

  useEffect(() => {
    filter.refetch(genre)  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  if (!show) return null
  if (books.loading || filter.loading) return <p>Loading...</p>
  if (books.error || filter.error) return <p>Error :(</p>

  const filterGenre = (event) => {
    let q = event.target.value === 'all genres' ?  '' : event.target.value
    setGenre(q)
  }
  
  const showfilterGenreButtons = (arr) => {
    arr = arr.reduce((acc, b) => acc.concat(b.genres), [])
    arr.push('all genres')
    return [...new Set(arr)]
  }

  const showBooks = (arr) => {
    return arr.map(b =>
      <tr key={b.title}>
        <td>{b.title}</td>
        <td>{b.author.name}</td>
        <td>{b.published}</td>
      </tr>
    )
  }

  return (
    <div>
      <h2>Books</h2>
      <p>In genre {!genre ? 'all genres' : genre}</p>
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
          {genre ? showBooks(filter.data.allBooks) : showBooks(books.data.allBooks)}
        </tbody>
      </table>
      {showfilterGenreButtons(books.data.allBooks).map(b =>
        <button value={b} key={b} onClick={filterGenre}>{b}</button>
      )}
    </div>
  )
}

export default Books