import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const showNotification = (message, timeout) => {
  return (dispatch) => {
    const delay = timeout * 1000
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, delay)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
