const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

blogRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  const id = request.params.id
  try {
    let blog = await Blog.findById(id)
    blog.comments = blog.comments.concat(body.comment)
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
      .populate('user','id name username')
    response.status(200).json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      throw({ name: 'JsonWebTokenError' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      user: user._id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })
    blog.populate('user','id name username').execPopulate()

    const result = await blog.save()
    user.blogs = user.blogs.concat(result.id)
    await user.save()

    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      throw({
        name: 'JsonWebTokenError'
      })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if(user.id.toString() !== blog.user.toString()) {
      throw({
        name: 'Unauthorized'
      })
    }

    await Blog.findByIdAndRemove(request.params.id)
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
      .populate('user','id name username')
    response.status(200).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter