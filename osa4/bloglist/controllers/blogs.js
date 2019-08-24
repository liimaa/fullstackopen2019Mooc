const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
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
      likes: !body.likes ? 0 :body.likes
    })
    const blog = await blogBody.save()
    response.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter