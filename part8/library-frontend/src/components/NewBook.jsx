import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = ({ show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      const newBook = response.data.addBook

      cache.updateQuery({ query: ALL_BOOKS }, (data) => {
        if (!data) return data

        return { allBooks: data.allBooks.concat(newBook) }
      })

      newBook.genres.forEach((g) => {
        cache.updateQuery(
          { query: ALL_BOOKS, variables: { genre: g } },
          (data) => {
            if (!data) return data

            return { allBooks: data.allBooks.concat(newBook) }
          }
        )
      })

      cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: '' } },
        (data) => {
          if (!data) return data

          return { allBooks: data.allBooks.concat(newBook) }
        }
      )

      cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
        if (!data) return data

        const existingAuthor = data.allAuthors.find(
          (a) => a.name === newBook.author.name
        )

        if (existingAuthor) {
          return {
            allAuthors: data.allAuthors.map((a) =>
              a.name === newBook.author.name
                ? { ...a, bookCount: a.bookCount + 1 }
                : a
            )
          }
        }
        return {
          allAuthors: data.allAuthors.concat({
            name: newBook.author.name,
            born: null,
            bookCount: 1
          })
        }
      })
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await createBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            Add genre
          </button>
        </div>
        <div>Genres: {genres.join(' ')}</div>
        <button type="submit">Create book</button>
      </form>
    </div>
  )
}

export default NewBook
