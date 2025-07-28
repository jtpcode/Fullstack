import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
        return action.payload
    case "REMOVE_NOTIFICATION":
        return ''
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const notify = (message) => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'REMOVE_NOTIFICATION' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={ [notification, notify] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext