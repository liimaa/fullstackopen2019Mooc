import React, {useState} from 'react'
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

const Books = ({books, filterBooks, show}) => {
  const [genre, setGenre] = useState('')
  const { data, errors } = useQuery(FILTER_BOOKS, { variables: { genre: genre } });

  if (!show) return null
  if (books.loading) return <p>Loading...</p>
  if (books.error) return <p>Error :(</p>

  const filterGenre = async (event) => {
    event.target.value === "all genres" ? 
    setGenre('') : setGenre(event.target.value)
  }
  
  const showfilterGenreButtons = (arr) => {
    arr = arr.reduce((acc, b) => acc.concat(b.genres), [])
    arr.push('all genres')
    return [...new Set(arr)]
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
          {data ? data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ): null }
        </tbody>
      </table>
      {showfilterGenreButtons(books.data.allBooks).map(b =>
        <button value={b} key={b} onClick={filterGenre}>{b}</button>
      )}
    </div>
  )
}

export default Books