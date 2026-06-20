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
  await blog.save()

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
  expect(response.body[response.body.length - 1].title).toBe('Blog3')
  expect(response.body[response.body.length - 1].author).toBe('him')
  expect(response.body[response.body.length - 1].url).toBe('http://blog3.com')
  expect(response.body[response.body.length - 1].likes).toBe(0)
  // expect(response.body).toContainEqual(blogToAdd)
})

test('When added a blog without the field likes is 0 by default', async () => {
  const blogWithoutLikes = {
    title: 'BlogWithoutLikes',
    author: 'No one',
    url: 'http://www.blogwithoutlikes.com'
  }

  const blog = new Blog(blogWithoutLikes)
  await blog.save()

  const response = await api.get('/api/blogs')
  expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('When trying to add a blog without title or url the server responds with a code 400 bad request', async () => {
  const blogWithoutTitle = {
    author: 'the outher one',
    url: 'http://blogwithouttitle.com',
    likes: 0
  }

  const blogWithoutUrl = {
    title: 'BlogWithoutURL',
    author: 'another one',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
