import Togglable from './Togglable'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabelShow='Show' buttonLabelHide='Hide'>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
