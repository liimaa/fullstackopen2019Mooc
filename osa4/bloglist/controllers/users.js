const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1, author: 1, likes: 1, url: 1
    })
    response.json(users.map(user => user.toJSON()))
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {

    if(body.password.length < 4 ) {
      throw ({
        name: 'ValidationError',
        message: 'Password validation failed: Password: minium length allowed is four (4).'
      })
    }

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