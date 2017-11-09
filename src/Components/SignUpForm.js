import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Form, Message } from 'semantic-ui-react'

const SignUpForm = ({ handleSignUpState, signUp, signUpState }) => (
  <Form error={signUpState.hasError} onSubmit={signUp}>
    <Form.Group>
      <Form.Input
        label='Display Name'
        name='displayName'
        onChange={handleSignUpState}
        type='text'
        value={signUpState.displayName}
        width={16}
      />
    </Form.Group>
    <Form.Group>
      <Form.Input
        label='Email'
        name='email'
        onChange={handleSignUpState}
        type='text'
        value={signUpState.email}
        width={16}
      />
    </Form.Group>
    <Form.Group>
      <Form.Input
        label='Password'
        name='password'
        onChange={handleSignUpState}
        type='password'
        value={signUpState.password}
        width={16}
      />
    </Form.Group>
    <Form.Group>
      <Form.Input
        label='Confirm Password'
        name='confirmpass'
        onChange={handleSignUpState}
        type='password'
        value={signUpState.confirmpass}
        width={16}
      />
    </Form.Group>
    <Divider hidden />
    <Message error header='Error' content={signUpState.errorMessage} />
    <Form.Button
      aria-label='Sign Up'
      color='orange'
      content='Sign Up'
      type='submit'
    />
  </Form>
)

SignUpForm.propTypes = {
  handleSignUpState: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  signUpState: PropTypes.object.isRequired
}

export default SignUpForm
