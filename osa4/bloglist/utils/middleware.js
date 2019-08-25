const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))

const morganLog = () => {
  return morgan(':method :url :status :res[content-length] - :response-time ms :body')
}

const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: 'Token missing or invalid' })
  } else if(error.name === 'Unauthorized') {
    return response.status(401).send({ error: 'invalid permissions' })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

const jwtTokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token =  authorization.substring(7)
  }
  next()
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  morganLog,
  jwtTokenExtractor
}