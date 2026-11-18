import { useRef, useState } from 'react'
import Togglable from './Togglable'
export default function BlogForm ({ handleCreateBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    handleCreateBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <Togglable ref={togglableRef} buttonLabelShow='Create Note' buttonLabelHide='Hide'>
        <form onSubmit={handleSubmit}>
          <div>Title:
            <input
              type='text'
              value={title}
              name='Title'
              placeholder='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>Author:
            <input
              type='text'
              value={author}
              name='Author'
              placeholder='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            URL:
            <input
              type='text'
              value={url}
              name='URL'
              placeholder='URL'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button>Create</button>
        </form>
      </Togglable>
    </div>
  )
}
