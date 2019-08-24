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
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  morganLog
}