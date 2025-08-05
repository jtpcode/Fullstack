import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendBlogToUser(state, action) {
      return
    }
  }
})

// Manual redux thunk
export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const { setUsers, appendBlogToUser } = usersSlice.actions
export default usersSlice.reducer
