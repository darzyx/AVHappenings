import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Form } from 'semantic-ui-react'

const SubmitForm = ({ handleSubmitState, submit, submitState }) => (
  <Form onSubmit={submit}>
    <Form.Group>
      <Form.Input
        label='Name'
        name='name'
        onChange={handleSubmitState}
        placeholder='Name this happening!'
        value={submitState.name}
        width={8}
      />
      <Form.Input
        label='Date'
        name='date'
        onChange={handleSubmitState}
        placeholder='When is it?'
        value={submitState.date}
        width={8}
      />
    </Form.Group>
    <Form.Group>
      <Form.Input
        label='Time'
        name='time'
        onChange={handleSubmitState}
        placeholder='At what time?'
        value={submitState.time}
        width={4}
      />
      <Form.Input
        label='Location'
        name='location'
        onChange={handleSubmitState}
        placeholder='Where is it?'
        value={submitState.location}
        width={12}
      />
    </Form.Group>
    <Form.Group>
      <Form.Input
        label='Description'
        name='description'
        onChange={handleSubmitState}
        placeholder='Give a short description.'
        value={submitState.description}
        width={16} />
    </Form.Group>
    <Form.Group>
      <Form.TextArea
        autoHeight
        label='Details'
        name='details'
        onChange={handleSubmitState}
        placeholder='Now give us the in-depth details.'
        value={submitState.details}
        width={16} />
    </Form.Group>
    <Divider hidden />
    <Form.Button
      aria-label='Submit'
      color='orange'
      content='Submit'
      type='submit'
    />
  </Form>
)

SubmitForm.propTypes = {
  handleSubmitState: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  submitState: PropTypes.object.isRequired
}

export default SubmitForm
