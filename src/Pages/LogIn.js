import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userAuth } from '../Utils/Firebase.js'
import ContentBox from '../Components/ContentBox'
import MessageBox from '../Components/MessageBox'
import LogInForm from '../Components/LogInForm'

class LogIn extends Component {
  constructor(props) {
    super(props)

    this.state = { email: '', password: '', hasError: false }

    this._handleLogInState = this._handleLogInState.bind(this)
    this._logIn = this._logIn.bind(this)
  }

  _logIn() {
    const { email, password } = this.state
    userAuth.signInWithEmailAndPassword(email, password).catch(() => {
      this.setState(() => ({ hasError: true }))
    })
  }

  _handleLogInState(e) {
    this.setState({ [e.target.name]: e.target.value, hasError: false })
  }

  render() {
    const { _handleLogInState, _logIn, state } = this
    return (
      <div>
        <ContentBox fitted title='Log In' subtitle='Hey, welcome back.'>
          <LogInForm
            handleLogInState={_handleLogInState}
            logIn={_logIn}
            logInState={state}
          />
        </ContentBox>
        <MessageBox fitted>
          New here? <Link to='/signup'>Sign Up</Link>
        </MessageBox>
      </div>
    )
  }
}

export default LogIn
