import blogService from "../services/blogs"

const initialState = []

const reducer = (state = initialState, action) => {
  //console.log('action', action, state)
  switch (action.type) {
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id !== action.data.id ? blog : action.data)
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      userID: blog.user.id
    })
    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data:  { id } 
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const newBlog = await blogService.createComment(blog.id, {comment})
    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog
    })
  }
}

export default reducer