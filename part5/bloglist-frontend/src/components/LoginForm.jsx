import { useState } from 'react'
import Togglable from './Togglable.jsx'
export default function LoginForm ({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <Togglable buttonLabelShow='Show Login' buttonLabelHide='Cancel'>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type='text'
              value={username}
              name='Username'
              placeholder='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <input
              type='password'
              value={password}
              name='Password'
              placeholder='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button>
            Login
          </button>
        </form>
      </Togglable>
    </div>
  )
}
