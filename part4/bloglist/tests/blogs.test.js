const mongoose = require('mongoose')
const supertest = require('supertest')

const { app, server } = require('../index')
const Blog = require('../models/blog')
const initialBlogs = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blog = new Blog(initialBlogs[0])
  await blog.save()

  blog = new Blog(initialBlogs[1])
  await blog.save()
})

test('Blogs are returned as json and with code 200', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('The number of blogs returned are correct', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
  expect(200)
})

test('The blog identifier is returned as id instead of _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).toBeUndefined()
})

test('When a blog is added the number of blogs are correct and the blog is correct', async () => {
  const blogToAdd = {
    title: 'Blog3',
    author: 'him',
    url: 'http://blog3.com',
    likes: 0
  }

  const blog = new Blog(blogToAdd)
  await blog
    .save()

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
  expect(response.body[response.body.length - 1].title).toBe('Blog3')
  expect(response.body[response.body.length - 1].author).toBe('him')
  expect(response.body[response.body.length - 1].url).toBe('http://blog3.com')
  expect(response.body[response.body.length - 1].likes).toBe(0)
  // expect(response.body).toContainEqual(blogToAdd)
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
