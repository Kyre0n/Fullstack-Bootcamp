const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user.js')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/', async (request, response, next) => {
  const { username, name, password: plainPassword } = request.body
  if (!plainPassword || plainPassword.length < 3) {
    const error = new Error('Password must be at least 3 characters long')
    error.name = 'PasswordValidationError'
    return next(error)
  }

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
