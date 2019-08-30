const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const addNotification = (notification) => {
  return {
    type: 'ADD_NOTIFICATION',
    notification
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default reducer