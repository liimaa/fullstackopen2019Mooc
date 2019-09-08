const initialState = {
  message: null,
  type: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const addNotification = (notification, secound) => {
  return dispatch => {
    if(!secound) secound = 2 
    const millisecond = (secound * 1000).toFixed(0)
    dispatch({
      type: 'ADD_NOTIFICATION',
      notification
    })

    setTimeout(() => {
      dispatch({
        type: 'ADD_NOTIFICATION',
        notification: initialState
      })
    }, millisecond)
  }
}

export default reducer