import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'

import Notification from './components/Notification'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, unsetUser } from './reducers/userReducer'
import Blogs from './components/Blogs'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const users = useSelector(({ users }) => users)
  const currentUser = useSelector(({ user }) => user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
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
    dispatch(unsetUser())
    blogService.setToken(null)
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

  const padding = {
    padding: 5
  }

  if (currentUser === null) {
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
      <Notification />

      <div>
        <Link style={padding} to="/blogs">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {<em>{currentUser.name} logged in</em>}
        <button onClick={handleLogout} style={padding}>
          Logout
        </button>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Blogs blogs={blogs} currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/blogs" element={<Navigate to="/" />} />
        {/* <Route path="/blogs/:id" element={<Blog blog={blog} />} /> */}
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/login" element={loginForm()} />
      </Routes>
    </div>
  )
}

export default App
