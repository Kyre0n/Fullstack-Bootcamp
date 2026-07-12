const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user.js')

userRouter.get('/', async (request, response, next) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/', async (request, response, next) => {
  const { username, name, password: plainPassword } = new User(request.body)

  const saltRounds = 10
  const password = await bcrypt.hash(plainPassword, saltRounds)

  const user = new User({
    username,
    name,
    password
  })
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter
