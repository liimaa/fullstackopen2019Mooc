const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const addNotification = (notification, secound) => {
  return dispatch => {
    const millisecond = (secound * 1000).toFixed(0);
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      notification
    })

    setTimeout(() => {
      dispatch({
        type: 'ADD_NOTIFICATION',
        notification: null
      })
    }, millisecond)
  }
}

export default reducer