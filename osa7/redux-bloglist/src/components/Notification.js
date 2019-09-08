import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Notification = ({notification}) => {
  if(!notification.message) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
}

export default connect(
  mapStateToProps
)(Notification)
