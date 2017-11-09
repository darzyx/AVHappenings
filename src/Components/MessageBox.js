import React from 'react'
import PropTypes from 'prop-types'
import { Container, Divider, Message } from 'semantic-ui-react'

const MessageBox = ({ children, fitted, title }) => (
  <Container text={fitted}>
    <Message color='orange' className='center-style'>
      { title && <Message.Header>{title}</Message.Header> }
      <Message.Content>{children}</Message.Content>
    </Message>
    <Divider hidden />
  </Container>
)

MessageBox.propTypes = { fitted: PropTypes.bool, title: PropTypes.string }

export default MessageBox
