import Togglable from './Togglable'
const Blog = ({ blog, handleUpdateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }
    handleUpdateLikes(blogObject, blog.id)
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
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
