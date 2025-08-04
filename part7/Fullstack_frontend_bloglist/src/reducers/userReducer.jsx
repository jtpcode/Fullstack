import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    }
  }
})

// Manual redux thunk
export const setUser = (user) => {
  return (dispatch) => {
    dispatch(addUser(user))
  }
}

export const unsetUser = () => {
  return (dispatch) => {
    dispatch(removeUser())
  }
}

export const { addUser, removeUser } = userSlice.actions
export default userSlice.reducer
