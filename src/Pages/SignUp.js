import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userAuth, usersDB, timestamp } from '../Utils/Firebase.js'
import ContentBox from '../Components/ContentBox'
import MessageBox from '../Components/MessageBox'
import SignUpForm from '../Components/SignUpForm'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmpass: '',
      hasError: false,
      errorMessage: ''
    }

    this._handleSignUpState = this._handleSignUpState.bind(this)
    this._validateInput = this._validateInput.bind(this)
    this._signUp = this._signUp.bind(this)
  }

  _handleSignUpState(e) {
    this.setState({
      [e.target.name]: e.target.value, hasError: false, errorMessage: ''
    })
  }

  _signUp() {
    const caughtError = this._validateInput()
    if (caughtError) { return }

    const { displayName, email, password } = this.state
    userAuth.createUserWithEmailAndPassword(email, password).then(() => {
      const { uid } = userAuth.currentUser
      usersDB.doc(uid).set({
        displayName: displayName,
        email: email,
        joined: timestamp
      }).catch((error) => {
        // Error creating user database doc.
        const errorMessage = error.message
        this.setState({ hasError: true, errorMessage: errorMessage })
        console.error(errorMessage)
      })
    }).catch((error) => {
      // Error creating user with email and password.
      const errorMessage = error.message
      this.setState({ hasError: true, errorMessage: errorMessage })
      console.error(errorMessage)
    })
  }

  _validateInput() {
    const validChars = 'abcdefghijklmnopqrstuvwxyz0123456789.'
    const { displayName, password, confirmpass } = this.state
    const displayNameLen = displayName.length
    if (displayNameLen < 5 || displayNameLen > 16) {
      this.setState({
        hasError: true,
        errorMessage: 'Oops. displayName must be 5-16 characters long.'
      })
      return true
    }
    for (let i = 0; i < displayNameLen; i++) {
      if (validChars.indexOf(displayName[i].toLowerCase()) === -1) {
        this.setState({
          hasError: true,
          errorMessage: 'Oops. displayNames can only contain alphanumeric ' +
            'characters (A–Z, 0–9) and periods (".").'
        })
        return true
      }
    }
    if (password !== confirmpass) {
      this.setState({
        hasError: true,
        errorMessage: 'Oops. Passwords do not match.'
      })
      return true
    }
    return
  }

  render() {
    const { _handleSignUpState, _signUp, state } = this
    return (
      <div>
        <ContentBox fitted title='Sign Up' subtitle='Join the community.'>
          <SignUpForm
            handleSignUpState={_handleSignUpState}
            signUp={_signUp}
            signUpState={state}
          />
        </ContentBox>
        <MessageBox fitted>
          Have an account? <Link to='/login'>Log In</Link>
        </MessageBox>
      </div>
    )
  }
}

export default SignUp
