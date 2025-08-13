import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('')
  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
    skip: !show
  })

  if (!show) {
    return null
  }

  if (loading) return <p>Loading...</p>

  const books = data.allBooks
  const genres = [...new Set(books.flatMap((book) => book.genres))]

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('')}>All genres</button>
      </div>
    </div>
  )
}

export default Books
