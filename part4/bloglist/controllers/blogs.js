const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user')
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
  const { title, author, url, likes } = request.body

  User
    .findOne()
    .then(user => {
      const blog = new Blog({
        title,
        author,
        url,
        likes,
        user: user._id,
      })

      blog
        .save()
        .then(result => {
          user.blogs = user.blogs.concat(result._id)
          user.save()
          response.status(201).json(result)
        })
        .catch(error => next(error))
    })
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
