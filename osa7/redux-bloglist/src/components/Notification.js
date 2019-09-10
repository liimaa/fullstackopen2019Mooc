import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Button'

const Notification = ({notification}) => {
  if(!notification.message) {
    return null
  }

  return ( //notification.type
    <Alert variant={'info'}>
      {notification.message}
    </Alert>
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
