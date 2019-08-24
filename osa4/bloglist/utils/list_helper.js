const dummy = (blogs) => {
  return blogs ? 1 : undefined
}

const totalLikes = (blogs) => {
  if(blogs.length > 1) {
    return blogs.reduce((acc, obj) => {
      return acc + obj.likes
    }, 0)
  } else if(blogs.length === 0) {
    return 0
  }
  return blogs.likes
}

const favoriteBlog  = (blogs) => {
  if(blogs.length > 1) {
    const blogsMostLikes = Math.max(...blogs.map(a => a.likes), 0)
    return blogs.find(blog => blog.likes === blogsMostLikes)
  }
  return blogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}