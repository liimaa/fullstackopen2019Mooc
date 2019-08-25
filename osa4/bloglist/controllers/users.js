const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await User.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const userBody = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const user = await userBody.save()
    response.status(201).json(user)
  } catch (error) {
    next(error)
  }
})


module.exports = usersRouter