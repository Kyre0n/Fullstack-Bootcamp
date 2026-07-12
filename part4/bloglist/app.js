const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const mongoUrl = config.CONNECTION_STRING
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', require('./controllers/blogs'))
app.use('/api/users', require('./controllers/users'))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
