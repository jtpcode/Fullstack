import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  if (!notification) return null

  const successStyle = {
    color: 'green',
    backGround: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    backGround: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const style = notification.type === 'success' ? successStyle : errorStyle

  return <div style={style}>{notification.text}</div>
}

export default Notification
