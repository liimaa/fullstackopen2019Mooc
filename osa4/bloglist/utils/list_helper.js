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

module.exports = {
  dummy,
  totalLikes
}