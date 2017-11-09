import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import NavTrigger from './NavTrigger'

// Not stateless to allow handleClose + handleOpen props

class NavWrapper extends Component {
  render() {
    const { children, handleClose, handleOpen, isOpen } = this.props
    return (
      <Modal
        basic
        open={isOpen}
        onClose={handleClose}
        trigger={<NavTrigger onClick={handleOpen} />}
        size='small'
      >
        <Modal.Content>{children}</Modal.Content>
      </Modal>
    )
  }
}

NavWrapper.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default NavWrapper
