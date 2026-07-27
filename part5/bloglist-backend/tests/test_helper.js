const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Yo',
    url: 'http://www.blog1.com',
    likes: 3
  },
  {
    title: 'Blog 2',
    author: 'El',
    url: 'http://www.blog2.com',
    likes: 0
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
  {
    username: 'Samu',
    name: 'Samuel',
    password: 'SamuContraseña'
  }
]

const initialUsersBlogs = [
  {
    username: 'Samu2',
    name: 'Samuel2',
    password: 'SamuPass'
  }
]

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const userLogin = {
  username: 'Samu2',
  password: 'SamuPass'
}

module.exports = {
  initialBlogs,
  blogsInDB,
  initialUsers,
  initialUsersBlogs,
  usersInDB,
  userLogin
}
