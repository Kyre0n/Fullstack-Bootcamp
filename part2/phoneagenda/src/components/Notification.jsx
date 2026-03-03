const Notification = ({ notification }) => {
  if (!notification || notification.message === null) {
    return null
  }
  let notificationStyle = {
    color: 'green'
  }
  if (notification.error) {
    notificationStyle = {
       color: 'red',
    }
  }
  return (
    <div className="notification" style={notificationStyle}>
      {notification.message}
    </div>
  )
}

export default Notification