import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      console.log('createAnecdote state: ', state)
      console.log('createAnecdote action', action)

      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      console.log('voteAnecdote state: ', state)
      console.log('voteAnecdote action', action)

      const id = action.payload
      return state.map(a => 
        a.id !== id ? a : { ...a, votes: a.votes + 1 }
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const  { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
