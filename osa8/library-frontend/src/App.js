import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
 query allAuthors {
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`
const ALL_BOOKS = gql`
  query allBooks {
  allBooks  {
    title
    author
    published
    id
  }
}
`

const UPDATE_BORN = gql`
  mutation updateBorn($name: String!, $born: Int!) {
    editAuthor (
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      bookCount
      id
    }
  }
`
const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published, 
      genres: $genres
    ) {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      id
      genres
    }
  }
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = (error) => {
    console.log(error.message);
    if(error.graphQLErrors) {
      setErrorMessage(error.graphQLErrors[0].message)
    } else {
      setErrorMessage(error.message)
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: ['allBooks', 'allAuthors'], //[{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
    onError: handleError
  })

  const [updateBorn] = useMutation(UPDATE_BORN, {
    //refetchQueries: ['allAuthors'],
    onError: handleError
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {errorMessage &&
        <p style={{color: 'red'}}>
          {errorMessage}
        </p>
      }

      <Authors
        updateBorn={updateBorn}
        handleError={handleError}
        authors={authors}
        show={page === 'authors'}
      />

      <Books
        books={books}
        show={page === 'books'}
      />

      <NewBook
        addBook={addBook}
        handleError={handleError}
        show={page === 'add'}
      />

    </div>
  )
}

export default App