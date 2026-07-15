const mongoose = require('mongoose')
const supertest = require('supertest')

const { app, server } = require('../index')
const User = require('../models/user')
const { initialUsers, usersInDB } = require('./test_helper.js')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const user = new User(initialUsers[0])
  await user.save()
})

describe('Users', () => {
  test('with repeated username are not created', async () => {
    const usernameRepeated = {
      username: 'Samu',
      name: 'Miguel',
      password: '1234'
    }

    await api
      .post('/api/users')
      .send(usernameRepeated)
      .expect(400)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
  })

  test('without password or a password with less than 3 characters are not created', async () => {
    const withoutPassword = {
      username: 'Samu2',
      name: 'Aquel',
    }

    const shortPassword = {
      username: 'Samu3',
      name: 'El',
      password: '12'
    }

    await api
      .post('/api/users')
      .send(withoutPassword)
      .expect(400)

    await api
      .post('/api/users')
      .send(shortPassword)
      .expect(400)
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
  })

  test('without username cannot be created', async () => {
    const withoutUsername = {
      name: 'Ellos',
      password: '12345'
    }
    await api
      .post('/api/users')
      .send(withoutUsername)
      .expect(400)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
  })

  test('can create if has username and a password with at least 3 characters', async () => {
    const withoutName = {
      username: 'Samu4',
      password: '1234567asdf'
    }
    await api
      .post('/api/users')
      .send(withoutName)
      .expect(201)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(2)
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
