import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (e) {
      console.log(e)
      setNotification({
        message: 'Username or password incorrect',
        type: 'error'
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification({
        message: `A new blog '${returnedBlog.title}' by '${returnedBlog.author}' added`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (e) {
      console.log(e)
      setNotification({
        message: 'Complete all fields.',
        type: 'error'
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleUpdateLikes = async (blogObject, blogId) => {
    try {
      const returnedBlog = await blogService.update(blogObject, blogId)
      setBlogs(previous => previous.map(b => b.id === blogId ? returnedBlog : b))
    } catch (e) {
      console.log(e)
    }
  }

  const blogsOrdenados = [...blogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      <BlogForm
        handleCreateBlog={handleCreateBlog}
      />
      {
        blogsOrdenados.map(blog =>
          <Blog key={blog.id} blog={blog} handleUpdateLikes={handleUpdateLikes} />
        )
      }
    </div>
  )
}

export default App
