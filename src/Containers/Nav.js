import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { userAuth } from '../Utils/Firebase'
import NavWrapper from '../Components/NavWrapper'
import NavButton from '../Components/NavButton'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }

    this._handleOpen = this._handleOpen.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._logOut = this._logOut.bind(this)
  }

  _handleOpen() { this.setState(() => ({ isOpen: true })) }

  _handleClose() { this.setState(() => ({ isOpen: false })) }

  _logOut() {
    userAuth.signOut().then(() => { this._handleClose() })
    .catch((error) => { console.error('userAuth Error: ' + error.message) })
  }

  render() {
    const { _handleOpen, _handleClose, _logOut } = this
    const { isOpen } = this.state
    const { loggedIn } = this.props

    return (
      <NavWrapper
        handleClose={_handleClose}
        handleOpen={_handleOpen}
        isOpen={isOpen}
      >
        <NavButton icon='home' label='Home' linkTo='/'
          onClick={_handleClose} />
        {/* Repeated calls (as opposed to looping) preserve mount fadeIn */}
        {!loggedIn &&
          <NavButton icon='sign in' label='Log In' linkTo='/login'
          onClick={_handleClose} />}
        {loggedIn &&
          <NavButton icon='sign out' label='Log Out' linkTo='/'
          onClick={_logOut} />}
        {!loggedIn &&
          <NavButton icon='signup' label='Sign Up' linkTo='/signup'
          onClick={_handleClose} />}
        {loggedIn &&
          <NavButton icon='write' label='Submit' linkTo='/submit'
          onClick={_handleClose} />}
        <NavButton icon='help' label='Help' linkTo='/help'
          onClick={_handleClose} />
        <NavButton icon='info' label='About' linkTo='/about'
          onClick={_handleClose} />
      </NavWrapper>
    )
  }
}

Nav.propTypes = { loggedIn: PropTypes.bool.isRequired }

export default Nav
