import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state = null, action) => {
  //console.log('action', action, state)
  switch (action.type) {
    case 'INIT_USER':
      return action.data
    case 'ADD_USER':
      return action.data
    case 'RESET_USER':
      return null
    default:
      return state
  }
}

export const initUser = () => {
  return async dispatch => {
    const user = window.localStorage.getItem('user')
    if(user) {
      let u = JSON.parse(user)
      blogService.setToken(u.token)
      dispatch({
        type: 'INIT_USER',
        data: u
      })
    }
  }
}

export const addUser = (user) => {
  return async dispatch => {
    const login = await loginService.login(user)
    window.localStorage.setItem('user', JSON.stringify(login))
    blogService.setToken(login.token)
    dispatch({
      type: 'ADD_USER',
      data: login
    })
  }
}

export const resetUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('user')
    dispatch({
      type: 'RESET_USER',
    })
  }
}

export default reducer