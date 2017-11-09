import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Form, Message } from 'semantic-ui-react'

const LogInForm = ({ handleLogInState, logIn, logInState }) => (
  <Form error={logInState.hasError} onSubmit={logIn}>
    <Form.Group>
      <Form.Input
        label='Email'
        name='email'
        onChange={handleLogInState}
        type='text'
        value={logInState.email}
        width={16}
      />
    </Form.Group>
    <Form.Group>
      <Form.Input
        label='Password'
        name='password'
        onChange={handleLogInState}
        type='password'
        value={logInState.password}
        width={16}
      />
    </Form.Group>
    <Divider hidden />
    <Message
      error
      header='Error'
      content='Invalid email and/or password.'
    />
    <Form.Button
      aria-label='Log In'
      color='orange'
      content='Log In'
      type='submit'
    />
  </Form>
)

LogInForm.propTypes = {
  handleLogInState: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  logInState: PropTypes.object.isRequired
}

export default LogInForm
