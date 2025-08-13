import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('')
  const { data: allData, loading: loadingAll } = useQuery(ALL_BOOKS, {
    skip: !show
  })
  const { data: filteredData, loading: loadingFiltered } = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
    skip: !show
  })

  if (!show) {
    return null
  }

  if (loadingAll || loadingFiltered) return <p>Loading...</p>

  const allBooks = allData.allBooks
  const filteredBooks = filteredData.allBooks
  const genres = [...new Set(allBooks.flatMap((book) => book.genres))]

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
          {filteredBooks.map((b) => (
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
