const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1, name: 1
    })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {

    if (!body.title || !body.url) {
      throw({
        name: 'ValidationError',
        message:'title or url is missing'
      })
    }

    const blogBody = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: !body.likes ? 0 : body.likes
    })
    const blog = await blogBody.save()
    response.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const blog = await Blog.findByIdAndUpdate(id,
      request.body, { new: true })
    response.status(200).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter