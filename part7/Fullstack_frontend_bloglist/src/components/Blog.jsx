import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { showNotification } from '../reducers/notificationReducer'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const blog = blogs.find((b) => b.id === id)
  const currentUser = useSelector(({ user }) => user)

  // Backend brings blogs with all user-fields (including 'id' because of 'populate'),
  // but when user adds a new blog, the 'blogs' -state only gets user = id
  const usersBlog =
    currentUser.id === blog.user.id || currentUser.id === blog.user
  const deleteShown = { display: usersBlog ? '' : 'none' }

  const addLike = async () => {
    try {
      const likedBlog = { ...blog, likes: blog.likes + 1 }
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

  const removeBlog = async () => {
    const ok = window.confirm(`Delete blog '${blog.title}'?`)
    if (ok) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(
          showNotification(
            { text: `Blog "${blog.title}" deleted`, type: 'success' },
            3
          )
        )
        navigate('/')
      } catch (exception) {
        dispatch(
          showNotification({ text: 'Deleting blog failed.', type: 'error' }, 3)
        )
      }
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>{blog.likes} likes</div>
      <div>Added by {blog.author}</div>
      <button onClick={addLike}>Like</button>
      <button style={deleteShown} onClick={removeBlog}>
        Delete
      </button>
    </div>
  )
}

export default Blog
