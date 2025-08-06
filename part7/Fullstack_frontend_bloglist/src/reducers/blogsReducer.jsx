import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { addBlogToUser, removeBlogFromUser } from '../reducers/usersReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
    addLikeToBlog(state, action) {
      const likedBlog = action.payload
      return state.map((b) => (b.id !== likedBlog.id ? b : likedBlog))
    }
  }
})

// Manual redux thunk
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
    dispatch(addBlogToUser(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
    dispatch(removeBlogFromUser(id))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.addLike(blog)
    dispatch(addLikeToBlog(likedBlog))
  }
}

export const { setBlogs, appendBlog, removeBlog, addLikeToBlog } =
  blogsSlice.actions
export default blogsSlice.reducer
