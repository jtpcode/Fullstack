import { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const { data, loading } = useQuery(ALL_AUTHORS)

  if (loading) return <p>Loading...</p>
  const authors = data.allAuthors

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add book</button>
        <button onClick={() => setPage('recommended')}>Recommended</button>
        <button onClick={logout}>Logout</button>
      </div>

      <Authors show={page === 'authors'} authors={authors} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommended show={page === 'recommended'} />
    </div>
  )
}

export default App
