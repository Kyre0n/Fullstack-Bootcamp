const TokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  console.log('Dentro antes')
  if (authorization && authorization.startsWith('Bearer ')) {
    console.log('Dentro despues')
    const token = authorization.replace('Bearer ', '')
    request.token = token
  } else {
    console.log('Dentro antes de return null')
    request.token = null
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError') {
    return response.status(400).json({ error: 'Username or password incorrect' })
  } else if (error.name === 'PasswordValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

module.exports = {
  TokenExtractor,
  unknownEndpoint,
  errorHandler
}
