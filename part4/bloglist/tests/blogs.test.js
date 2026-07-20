const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDB, initialUsersBlogs, userLogin } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('Despues de borrar la BBDD')

  await api
    .post('/api/users')
    .send(initialUsersBlogs[0])
  console.log(initialUsersBlogs[0])
  console.log('Despues de guardar el user en el BeforeEach')
  console.log(userLogin)
  const loginResponse = await api
    .post('/api/login')
    .send(userLogin)

  const token = loginResponse.body.token
  console.log(token)

  console.log(await User.find({}))

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(initialBlogs[0])
    .expect(201)
  console.log('Despues de insertar el primer Blog')

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(initialBlogs[1])
    .expect(201)
  console.log('Despues de insertar el segundo Blog')
  console.log('Termina beforeEach')
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
  console.log('Sale esto?')
  const blogToAdd = {
    title: 'Blog3',
    author: 'him',
    url: 'http://blog3.com',
    likes: 0
  }

  console.log('AntesLogin')
  const loginResponse = await api
    .post('/api/login')
    .send(userLogin)

  const token = loginResponse.body.token

  console.log(token)
  console.log('pruebaToken')
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogToAdd)

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

  await api
    .post('/api/blogs')
    .send(blogWithoutLikes)

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

  console.log('AntesLogin')
  const loginResponse = await api
    .post('/api/login')
    .send(userLogin)

  const token = loginResponse.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutUrl)
    .expect(400)
})

test('Deleting a blog is done successfully', async () => {
  const blogs = await api.get('/api/blogs')
  const blogToDelete = blogs.body[0]

  await api
    .delete('/api/blogs/' + blogToDelete.id)
    .expect(204)

  const blogsAtEnd = await blogsInDB()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
  expect(blogsAtEnd.find(blog => blog.id === blogToDelete.id)).toBeUndefined()
})

test('Updated blog is updated correctly', async () => {
  const blogs = await api.get('/api/blogs')
  const blogToUpdate = blogs.body[0]

  await api.put('/api/blogs')
})

afterAll(() => {
  mongoose.connection.close()
})
