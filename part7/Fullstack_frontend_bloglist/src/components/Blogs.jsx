import { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { showNotification } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

const Blogs = ({ blogs, currentUser }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(
        showNotification(
          { text: `New blog "${newBlog.title}" added`, type: 'success' },
          3
        )
      )
    } catch (exception) {
      dispatch(
        showNotification({ text: 'Creating blog failed.', type: 'error' }, 3)
      )
    }
  }

  const removeBlog = async (blog) => {
    try {
      dispatch(deleteBlog(blog.id))
      dispatch(
        showNotification(
          { text: `Blog "${blog.title}" deleted`, type: 'success' },
          3
        )
      )
    } catch (exception) {
      dispatch(
        showNotification({ text: 'Deleting blog failed.', type: 'error' }, 3)
      )
    }
  }

  const addLike = async (likedBlog) => {
    try {
      dispatch(likeBlog(likedBlog))
      dispatch(
        showNotification(
          { text: `Blog "${likedBlog.title}" liked`, type: 'success' },
          3
        )
      )
    } catch (exception) {
      dispatch(
        showNotification({ text: 'Liking a blog failed.', type: 'error' }, 3)
      )
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <h2>Create a new blog</h2>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <br />
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            user={currentUser}
            removeBlog={removeBlog}
          />
        ))}
      <br />
    </div>
  )
}

export default Blogs
