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
  try {
    const blogBody = new Blog(request.body)
    const blog = await blogBody.save()
    response.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter