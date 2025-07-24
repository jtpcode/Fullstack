import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      console.log('showNotification state: ', state)
      console.log('showNotification action', action)

      return action.payload
    },
    removeNotification(state, action) {
      console.log('removeNotification state: ', state)
      console.log('removeNotification action', action)

      return ''
    }
  }
})

// Redux thunk
export const showNotification = (message) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 2000)
  }
}

export const  { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
