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

const mostBlogs  = (blogs) => {
  if(blogs.length > 1) {
    const allAuthorOccs = blogs.reduce(function(obj, v) {
      obj[v.author] = (obj[v.author] || 0) + 1
      return obj
    }, {})

    const authorBlogsCount = Math.max(...Object.values(allAuthorOccs))
    const author = Object.keys(allAuthorOccs).reduce((a, b) => {
      return allAuthorOccs[a] > allAuthorOccs[b] ? a : b
    })

    const popularAuthor = {
      'author': author,
      'blogs': authorBlogsCount
    }
    return popularAuthor
  }
  return { 'author': blogs.author, 'blogs': 1 }
}

const mostLikes  = (blogs) => {
  if(blogs.length > 1) {
    const allAuthorlikes = blogs.reduce((obj, v) => {
      obj[v.author] = (obj[v.author] || 0) + v.likes
      return obj
    }, {})

    const authorLikesCount = Math.max(...Object.values(allAuthorlikes))
    const maxKey = Object.keys(allAuthorlikes).reduce((a, b) => {
      return allAuthorlikes[a] > allAuthorlikes[b] ? a : b
    })

    const popularAuthor = {
      'author': maxKey,
      'likes': authorLikesCount
    }
    return popularAuthor
  }
  return { 'author': blogs.author, 'likes': blogs.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}