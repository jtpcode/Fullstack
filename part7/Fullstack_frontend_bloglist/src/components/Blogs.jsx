import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { createBlog } from '../reducers/blogsReducer'
import { showNotification } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ blogs }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <br />
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      <br />
    </div>
  )
}

export default Blogs
