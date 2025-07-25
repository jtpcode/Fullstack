import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>Vote</button>
      </div> 
    </li>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if ( filter === '' ) {
      return [...anecdotes].sort((a, b) => b.votes - a.votes)
    }

    const filtered_anecdotes = anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
    return filtered_anecdotes.sort((a, b) => b.votes - a.votes)
  })

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted: '${anecdote.content}'`, 3))
  }

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      )}
    </ul>
  )
}

export default Anecdotes