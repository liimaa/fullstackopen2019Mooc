import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

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
    published
    author { 
      name 
      born
      bookCount
      id
    }
    genres
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
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('books-user-token'))
  const [page, setPage] = useState('authors') //recommendations

  const handleError = (error) => {
    console.log(error.message)
    if(error.graphQLErrors) {
      setErrorMessage(error.graphQLErrors[0].message)
    } else {
      setErrorMessage(error.message)
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  
  const [login] = useMutation(LOGIN, {
    onError: handleError,
  })

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: ['allBooks', 'allAuthors',
     'recommendations', 'filterBooks'],
    onError: handleError
  })

  const [updateBorn] = useMutation(UPDATE_BORN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('recommendations')}>recommendations</button> : null}
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={logout}>logout</button> : <button onClick={() => setPage('login')}>login</button> }
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

      <LoginForm
        login={login}
        setToken={(token) => setToken(token)}
        handleError={handleError}
        setPage={(page) => setPage(page)}
        show={page === 'login'}
      />

      <Recommendations
        token={token}
        show={page === 'recommendations'}
      />

    </div>
  )
}

export default App