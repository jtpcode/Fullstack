import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import { showNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  deleteBlog
} from './reducers/blogsReducer'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)

  const [blogsit, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(
        showNotification({ text: 'Wrong credentials.', type: 'error' }, 3)
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
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
      await blogService.addLike(likedBlog)
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

  const loginForm = () => {
    const loginHidden = { display: loginVisible ? 'none' : '' }
    const loginShown = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={loginHidden}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={loginShown}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <div>
        <p>{user.name} logged in</p>
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
              user={user}
              removeBlog={removeBlog}
            />
          ))}
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default App
