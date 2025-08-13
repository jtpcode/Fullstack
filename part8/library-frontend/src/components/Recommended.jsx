import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'

const Recommended = ({ show }) => {
  const { data: favoriteData, loading: loadingFavorite } = useQuery(
    FAVORITE_GENRE,
    { skip: !show }
  )
  const favoriteGenre = favoriteData?.me?.favoriteGenre || ''
  const { data: filteredData, loading: loadingFiltered } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !show || !favoriteGenre
  })

  if (!show) {
    return null
  }

  if (loadingFavorite || loadingFiltered) return <p>Loading...</p>

  const filteredBooks = filteredData.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        Books in your favorite genre: <strong>{favoriteGenre}</strong>
      </div>
      <br />
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
    </div>
  )
}

export default Recommended
