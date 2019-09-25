import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const CURRENT_USER = gql`
   query me{
    me {
      username
      favoriteGenre
    }
  }
`
const ALL_RECOMMENDATIONS = gql`
  query recommendations($genre: String) {
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

const Recommendations = ({ show, token }) => {
  const user = useQuery(CURRENT_USER)
  const recommendations = useQuery(ALL_RECOMMENDATIONS, {
    variables: { genre: user.data && user.data.me ? user.data.me.favoriteGenre : '' },
  })

  if (!show) return null
  if(token && user.data && !user.data.me) user.refetch()
  if (recommendations.loading || user.loading) return <p>Loading...</p>
  if (recommendations.error || user.error) return <p>Error :(</p>

  return(
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre { user.data && user.data.me ? user.data.me.favoriteGenre : ''}</p>
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
          {recommendations.data.allBooks.map(a =>
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

export default Recommendations