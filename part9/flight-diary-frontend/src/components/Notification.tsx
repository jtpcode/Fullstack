interface NotificationProps {
  message: string | null
}

const Notification = ({ message }: NotificationProps) => {
    if (!message) return null

    if (message.startsWith('Error: ')) {
      return (
        <div style={{ color: 'red' }}>
          {message}
        </div>
      )
    }

    return (
      <div style={{ color: 'green' }}>
        {message}
      </div>
    )
  }

export default Notification