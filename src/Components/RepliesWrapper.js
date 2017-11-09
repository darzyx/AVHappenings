import React from 'react'
import { Comment, Container, Divider, Header } from 'semantic-ui-react'

const RepliesWrapper = ({ children }) => (
  <Container>
    <Divider hidden />
    <Comment.Group>
      <Header as='h3' dividing>Replies</Header>
      {children}
    </Comment.Group>
    <Divider hidden />
  </Container>
)

export default RepliesWrapper
