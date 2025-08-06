import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      const { newBlog, currentUser } = action.payload
      const newState = state.map((user) =>
        user.id !== currentUser.id
          ? user
          : { ...user, blogs: [...user.blogs, newBlog] }
      )
      return newState
    },
    removeBlog(state, action) {
      const { id, currentUser } = action.payload
      const newState = state.map((user) =>
        user.id !== currentUser.id
          ? user
          : { ...user, blogs: user.blogs.filter((b) => b.id !== id) }
      )
      return newState
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

export const addBlogToUser = (newBlog) => {
  return (dispatch, getState) => {
    const currentUser = getState().user
    dispatch(appendBlog({ newBlog, currentUser }))
  }
}

export const removeBlogFromUser = (id) => {
  return (dispatch, getState) => {
    const currentUser = getState().user
    dispatch(removeBlog({ id, currentUser }))
  }
}

export const { setUsers, appendBlog, removeBlog } = usersSlice.actions
export default usersSlice.reducer
