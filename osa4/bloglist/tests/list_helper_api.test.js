const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

let initialBlogs = [
  {
    'title': 'I Shall Seal The Heavens',
    'author': 'Er Gen',
    'url': 'https://www.webnovel.com/book/8058316805003405/I-Shall-Seal-The-Heavens',
    'likes': 401
  },
  {
    'title': 'Library of Heaven\'s Path',
    'author': 'Heng Sao Tian Ya',
    'url': 'https://www.webnovel.com/book/6831850602000905/Library-of-Heaven\'s-Path',
    'likes': 11834
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogArray = initialBlogs.map(blog => {
    return new Blog(blog).save()
  })

  await Promise.all(blogArray)
})

describe('Check if all initial blogs return', () => {
  test('Succeeds with blogs returning', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })
})

afterAll(() => mongoose.connection.close())