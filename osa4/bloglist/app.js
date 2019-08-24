const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('db connected'))
  .catch(error => console.error('db error:', error.message))

app.use(cors())
app.use(bodyParser.json())

app.use(middleware.morganLog())

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app