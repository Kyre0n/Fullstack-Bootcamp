const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  console.log('asdf')
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('AfterDecode')
  console.log(decodedToken)

  if (!decodedToken.id) {
    console('no deberia aparecer 1')
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    console.log('No deberia aparecer 2')
    return response.status(400).json({ error: 'user not found' })
  }

  console.log(user)
  console.log('afterUser')

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  })

  console.log('Antes del try')
  try {
    console.log('Antes de guardar el blog')
    const result = await blog.save()
    console.log('Despues de guardar el blog')
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    console.log('Despues de guardar el usuario')
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
