import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(voteAnecdote(anecdote.id))
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes