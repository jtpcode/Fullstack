import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(newAnecdote))
    dispatch(showNotification(`You added: '${newAnecdote}'`, 3))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
