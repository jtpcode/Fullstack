import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const showNotification = (message, timeout) => {
  return dispatch => {
    const delay = timeout * 1000
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, delay)
  }
}

export const  { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
